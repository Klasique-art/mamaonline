from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Category, Product, Order, Review
from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, ReviewSerializer, UserSerializer
from django.contrib.auth.models import User
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]










class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        product = serializer.save(seller=self.request.user, is_approved=False)
        self.send_notification("A new product has been submitted for approval.")

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAdminUser])
    def approve(self, request, pk=None):
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


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user)


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