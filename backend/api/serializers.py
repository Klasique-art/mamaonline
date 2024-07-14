from rest_framework import serializers
from .models import Category, SubCategory, Product, ProductAttribute, ProductImage, Coupon, Order, OrderItem, Review, Message, AttributeType, AttributeChoice
from django.contrib.auth.models import User

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
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'original_price', 'discounted_price', 
                  'category', 'subcategory', 'seller', 'condition', 'location', 
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
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True, source='orderitem_set')
    class Meta:
        model = Order
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'