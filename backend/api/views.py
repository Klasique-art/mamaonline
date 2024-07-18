from rest_framework import viewsets, permissions, status, filters
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import Category, SubCategory, Product, Order, Review, Message, Coupon, AttributeType, AttributeChoice, ProductAttribute
from .serializers import (
    CategorySerializer, SubCategorySerializer, ProductSerializer, 
    OrderSerializer, ReviewSerializer, UserSerializer, MessageSerializer,
    CouponSerializer, AttributeTypeSerializer, AttributeChoiceSerializer
)
from django.contrib.auth.models import User
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'

class SubCategoryViewSet(viewsets.ModelViewSet):
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']
    lookup_field = 'slug'

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'subcategory', 'seller', 'condition', 'is_approved']
    search_fields = ['name', 'description']
    ordering_fields = ['original_price', 'discounted_price', 'created_at']
    lookup_field = 'slug'

    @action(detail=False, methods=['get'])
    def discounted(self, request):
        discounted_products = Product.objects.filter(discounted_price__isnull=False, is_approved=True)
        serializer = self.get_serializer(discounted_products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_subcategory(self, request):
        subcategory_slug = request.query_params.get('subcategory_slug', None)
        if subcategory_slug is None:
            return Response({"error": "Subcategory slug is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        products = Product.objects.filter(subcategory__slug=subcategory_slug, is_approved=True)
        serializer = self.get_serializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def attributes(self, request):
        category_id = request.query_params.get('category_id')
        if category_id:
            attribute_types = AttributeType.objects.filter(category_id=category_id)
            serializer = AttributeTypeSerializer(attribute_types, many=True)
            return Response(serializer.data)
        return Response({"error": "Category ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def add_attribute(self, request, slug=None):
        product = self.get_object()
        attribute_choice_id = request.data.get('attribute_choice_id')
        if attribute_choice_id:
            try:
                attribute_choice = AttributeChoice.objects.get(id=attribute_choice_id)
                ProductAttribute.objects.create(product=product, attribute_choice=attribute_choice)
                return Response({'status': 'attribute added'})
            except AttributeChoice.DoesNotExist:
                return Response({"error": "Invalid attribute choice ID"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Attribute choice ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def remove_attribute(self, request, slug=None):
        product = self.get_object()
        attribute_id = request.data.get('attribute_id')
        if attribute_id:
            try:
                attribute = ProductAttribute.objects.get(id=attribute_id, product=product)
                attribute.delete()
                return Response({'status': 'attribute removed'})
            except ProductAttribute.DoesNotExist:
                return Response({"error": "Invalid attribute ID"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"error": "Attribute ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    def perform_create(self, serializer):
        product = serializer.save(seller=self.request.user, is_approved=False)
        self.send_notification("A new product has been submitted for approval.")

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def approve(self, request, slug=None):
        product = self.get_object()
        product.is_approved = True
        product.save()
        self.send_notification(f"The product '{product.name}' has been approved and is now live.")
        return Response({'status': 'product approved'})

    def send_notification(self, message):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            "admin_notifications",
            {
                "type": "send_notification",
                "message": message,
            }
        )

class AttributeChoiceViewSet(viewsets.ModelViewSet):
    queryset = AttributeChoice.objects.all()
    serializer_class = AttributeChoiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['attribute_type']

    @action(detail=False, methods=['get'])
    def by_attribute_type(self, request):
        attribute_type_id = request.query_params.get('attribute_type_id')
        if attribute_type_id:
            choices = AttributeChoice.objects.filter(attribute_type_id=attribute_type_id)
            serializer = self.get_serializer(choices, many=True)
            return Response(serializer.data)
        return Response({"error": "Attribute Type ID is required"}, status=status.HTTP_400_BAD_REQUEST)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        order = serializer.save(buyer=self.request.user)
        self.send_notification(f"A new order (ID: {order.id}) has been placed.")

    def send_notification(self, message):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            f"user_{self.request.user.id}",
            {
                "type": "send_notification",
                "message": message,
            }
        )

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class MessageViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Message.objects.filter(sender=user) | Message.objects.filter(receiver=user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    @action(detail=False, methods=['get'])
    def unread(self, request):
        unread_messages = Message.objects.filter(receiver=request.user, is_read=False)
        serializer = self.get_serializer(unread_messages, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        message = self.get_object()
        if message.receiver == request.user:
            message.is_read = True
            message.save()
            return Response({'status': 'message marked as read'})
        else:
            return Response({'error': 'You are not the receiver of this message'}, status=status.HTTP_403_FORBIDDEN)

class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [permissions.IsAdminUser]

    @action(detail=True, methods=['post'])
    def apply(self, request, pk=None):
        coupon = self.get_object()
        if not coupon.is_active:
            return Response({"error": "This coupon is not active"}, status=status.HTTP_400_BAD_REQUEST)
        
        # Here you would typically apply the coupon to the user's cart or order
        # For this example, we'll just return the discount percentage
        return Response({"discount": coupon.discount})



class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user_id': user.pk,
                'email': user.email
            })
        else:
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)