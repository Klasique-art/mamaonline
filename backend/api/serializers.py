from rest_framework import serializers
from dj_rest_auth.serializers import LoginSerializer
from .models import Category, SubCategory, Product, ProductAttribute, ProductImage, Coupon, Order, OrderItem, Review, Message, AttributeType, AttributeChoice
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'

class AttributeChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttributeChoice
        fields = ['id', 'value']

class AttributeTypeSerializer(serializers.ModelSerializer):
    choices = AttributeChoiceSerializer(many=True, read_only=True)
    class Meta:
        model = AttributeType
        fields = ['id', 'name', 'choices']

class ProductAttributeSerializer(serializers.ModelSerializer):
    attribute_type = serializers.CharField(source='attribute_choice.attribute_type.name', read_only=True)
    value = serializers.CharField(source='attribute_choice.value', read_only=True)
    class Meta:
        model = ProductAttribute
        fields = ['attribute_type', 'value']

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'image']

class ProductSerializer(serializers.ModelSerializer):
    attributes = ProductAttributeSerializer(many=True, read_only=True)
    images = ProductImageSerializer(many=True, read_only=True)
    category = CategorySerializer(read_only=True)
    subcategory = SubCategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    subcategory_id = serializers.PrimaryKeyRelatedField(queryset=SubCategory.objects.all(), source='subcategory', write_only=True)
    seller = UserSerializer(read_only=True)
    seller_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='seller', write_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'original_price', 'discounted_price', 
                  'category', 'subcategory', 'category_id', 'subcategory_id', 'seller', 'seller_id', 'condition', 'location', 
                  'is_approved', 'created_at', 'attributes', 'images']

    def create(self, validated_data):
        attributes_data = self.context['request'].data.get('attributes', [])
        images_data = self.context['request'].data.get('images', [])
        
        product = Product.objects.create(**validated_data)
        
        for attr_data in attributes_data:
            attribute_choice = AttributeChoice.objects.get(id=attr_data['attribute_choice'])
            ProductAttribute.objects.create(product=product, attribute_choice=attribute_choice)
        
        for image_data in images_data:
            ProductImage.objects.create(product=product, image=image_data)
        
        return product

class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product', write_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'order', 'product', 'product_id', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True, source='orderitem_set')
    buyer = UserSerializer(read_only=True)
    buyer_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='buyer', write_only=True)

    class Meta:
        model = Order
        fields = ['id', 'buyer', 'buyer_id', 'items', 'total_amount', 'payment_method', 'status', 'created_at']

class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='user', write_only=True)
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), source='product', write_only=True)

    class Meta:
        model = Review
        fields = ['id', 'product', 'product_id', 'user', 'user_id', 'rating', 'comment', 'created_at']

class MessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    sender_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='sender', write_only=True)
    receiver = UserSerializer(read_only=True)
    receiver_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), source='receiver', write_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_id', 'receiver', 'receiver_id', 'content', 'created_at', 'is_read']

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'






class CustomLoginSerializer(LoginSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    password = serializers.CharField(style={'input_type': 'password'})

    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')
        password = attrs.get('password')

        if not username and not email:
            msg = _('Must include either "username" or "email".')
            raise serializers.ValidationError(msg)

        user = None
        if email:
            try:
                username = User.objects.get(email__iexact=email).get_username()
            except User.DoesNotExist:
                pass

        if username:
            user = self.authenticate(username=username, password=password)

        if not user:
            msg = _('Unable to log in with provided credentials.')
            raise serializers.ValidationError(msg)

        attrs['user'] = user
        return attrs