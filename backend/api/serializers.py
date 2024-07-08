from rest_framework import serializers
from .models import Category, SubCategory, Product, ProductAttribute, Coupon, Order, OrderItem, Review, Message
from django.contrib.auth.models import User



class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    subcategories = SubCategorySerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = '__all__'

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['name', 'value']

class ProductSerializer(serializers.ModelSerializer):
    attributes = ProductAttributeSerializer(many=True, required=False)

    class Meta:
        model = Product
        fields = '__all__'

    def create(self, validated_data):
        attributes_data = validated_data.pop('attributes', [])
        product = Product.objects.create(**validated_data)
        for attr_data in attributes_data:
            ProductAttribute.objects.create(product=product, **attr_data)
        return product

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'




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


