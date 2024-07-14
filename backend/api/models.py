from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, max_length=100)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class SubCategory(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, related_name='subcategories', on_delete=models.CASCADE)
    slug = models.SlugField(unique=True, max_length=100)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(f"{self.category.name}-{self.name}")
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.category.name} - {self.name}"

    class Meta:
        verbose_name_plural = "Subcategories"

class AttributeType(models.Model):
    name = models.CharField(max_length=50)
    category = models.ForeignKey(Category, related_name='attribute_types', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.category.name} - {self.name}"

class AttributeChoice(models.Model):
    attribute_type = models.ForeignKey(AttributeType, related_name='choices', on_delete=models.CASCADE)
    value = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.attribute_type.name} - {self.value}"

class Product(models.Model):
    CONDITION_CHOICES = [
        ('NEW', 'New'),
        ('USED', 'Used'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, max_length=200)
    description = models.TextField()
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    seller = models.ForeignKey(User, on_delete=models.CASCADE)
    condition = models.CharField(max_length=4, choices=CONDITION_CHOICES, default='NEW')
    location = models.CharField(max_length=200)
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ProductAttribute(models.Model):
    product = models.ForeignKey(Product, related_name='attributes', on_delete=models.CASCADE)
    attribute_choice = models.ForeignKey(AttributeChoice, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.product.name} - {self.attribute_choice.attribute_type.name}: {self.attribute_choice.value}"

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')

    def __str__(self):
        return f"Image for {self.product.name}"

class Order(models.Model):
    PAYMENT_METHODS = (
        ('CASH', 'Cash'),
        ('CARD', 'Card'),
        ('MOBILE', 'Mobile Money'),
    )
    STATUS_CHOICES = (
        ('PENDING', 'Pending'),
        ('PROCESSING', 'Processing'),
        ('SHIPPED', 'Shipped'),
        ('DELIVERED', 'Delivered'),
    )
    buyer = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, through='OrderItem')
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_METHODS)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='PENDING')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id} by {self.buyer.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.product.name} in Order {self.order.id}"

class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review for {self.product.name} by {self.user.username}"

class Message(models.Model):
    sender = models.ForeignKey(User, related_name='sent_messages', on_delete=models.CASCADE)
    receiver = models.ForeignKey(User, related_name='received_messages', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"From {self.sender} to {self.receiver}"

class Coupon(models.Model):
    code = models.CharField(max_length=50, unique=True)
    discount = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)])
    valid_from = models.DateTimeField()
    valid_to = models.DateTimeField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Coupon {self.code} - {self.discount}% off"