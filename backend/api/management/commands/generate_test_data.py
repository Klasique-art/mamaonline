import random
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from django.utils.text import slugify
from django.db import IntegrityError
from api.models import Category, SubCategory, AttributeType, AttributeChoice, Product, ProductAttribute, ProductImage, Order, OrderItem, Review, Message, Coupon



def create_unique_slug(model_class, slug_field, value):
    base_slug = slugify(value)
    unique_slug = base_slug
    num = 1
    while model_class.objects.filter(**{slug_field: unique_slug}).exists():
        unique_slug = f"{base_slug}-{num}"
        num += 1
    return unique_slug

class Command(BaseCommand):
    help = 'Generates test data for the e-commerce platform'

    def handle(self, *args, **kwargs):
        self.stdout.write('Generating test data...')

        # Create users
        for i in range(10):
            User.objects.get_or_create(username=f'user{i}', defaults={'email': f'user{i}@example.com'})

        # Get existing categories or create new ones
        categories_subcategories = {
            'Electronics': ['Smartphones', 'Laptops', 'Tablets'],
            'Fashion': ['Men', 'Women', 'Children'],
            'Groceries': ['Fresh Produce', 'Dairy', 'Bakery'],
            'Books': ['Fiction', 'Non-fiction', 'Academic'],
            'Home & Garden': ['Furniture', 'Decor', 'Garden Tools']
        }

        for cat, subcats in categories_subcategories.items():
            slug = create_unique_slug(Category, 'slug', cat)
            category, created = Category.objects.get_or_create(name=cat, defaults={'slug': slug})
            if not created and not category.slug:
                category.slug = slug
                category.save()
            
            for subcat in subcats:
                subcat_slug = create_unique_slug(SubCategory, 'slug', f"{cat}-{subcat}")
                SubCategory.objects.get_or_create(
                    name=subcat,
                    category=category,
                    defaults={'slug': subcat_slug}
                )

        # Verify subcategories were created
        for category in Category.objects.all():
            subcategories = SubCategory.objects.filter(category=category)
            if not subcategories.exists():
                self.stdout.write(self.style.WARNING(f"No subcategories for {category.name}"))
            else:
                self.stdout.write(f"Subcategories for {category.name}: {', '.join([sc.name for sc in subcategories])}")



        # Create attribute types and choices
        attribute_types = {
            'Electronics': ['Brand', 'Color', 'Storage'],
            'Fashion': ['Size', 'Color', 'Material'],
            'Groceries': ['Brand', 'Weight', 'Packaging'],
            'Books': ['Format', 'Language'],
            'Home & Garden': ['Material', 'Color']
        }
        for cat, attrs in attribute_types.items():
            category = Category.objects.get(name=cat)
            for attr in attrs:
                attr_type, _ = AttributeType.objects.get_or_create(name=attr, category=category)
                choices = ['Choice 1', 'Choice 2', 'Choice 3']
                for choice in choices:
                    AttributeChoice.objects.get_or_create(attribute_type=attr_type, value=choice)

        # Create products
        for i in range(50):
            category = random.choice(Category.objects.all())
            subcategories = SubCategory.objects.filter(category=category)
            if not subcategories.exists():
                self.stdout.write(self.style.WARNING(f"No subcategories for {category.name}, skipping product creation"))
                continue
            subcategory = random.choice(subcategories)
            seller = random.choice(User.objects.all())
            slug = create_unique_slug(Product, 'slug', f'Product {i}')
            try:
                product, created = Product.objects.get_or_create(
                    name=f'Product {i}',
                    defaults={
                        'slug': slug,
                        'description': f'Description for Product {i}',
                        'original_price': random.uniform(10.0, 1000.0),
                        'discounted_price': random.uniform(5.0, 900.0),
                        'category': category,
                        'subcategory': subcategory,
                        'seller': seller,
                        'condition': random.choice(['NEW', 'USED']),
                        'location': 'Sample Location',
                        'is_approved': random.choice([True, False])
                    }
                )
                
                if created:
                    # Add attributes to product
                    attr_types = AttributeType.objects.filter(category=category)
                    for attr_type in attr_types:
                        choice = random.choice(AttributeChoice.objects.filter(attribute_type=attr_type))
                        ProductAttribute.objects.create(product=product, attribute_choice=choice)

                    # Add dummy image to product
                    ProductImage.objects.create(product=product, image='path/to/dummy/image.jpg')
            except IntegrityError:
                self.stdout.write(self.style.WARNING(f"Couldn't create product {i}"))

        # Create orders
        for _ in range(20):
            buyer = random.choice(User.objects.all())
            order = Order.objects.create(
                buyer=buyer,
                total_amount=random.uniform(50.0, 5000.0),
                payment_method=random.choice(['CASH', 'CARD', 'MOBILE']),
                status=random.choice(['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED'])
            )
            
            # Add order items
            for _ in range(random.randint(1, 5)):
                product = random.choice(Product.objects.all())
                OrderItem.objects.create(order=order, product=product, quantity=random.randint(1, 5))

        # Create reviews
        for i in range(100):
            product = random.choice(Product.objects.all())
            user = random.choice(User.objects.all())
            Review.objects.get_or_create(
                product=product,
                user=user,
                defaults={
                    'rating': random.randint(1, 5),
                    'comment': f'Sample review comment {i}'
                }
            )

        # Create messages
        for i in range(50):
            sender = random.choice(User.objects.all())
            receiver = random.choice(User.objects.exclude(id=sender.id))
            Message.objects.create(
                sender=sender,
                receiver=receiver,
                content=f'Sample message content {i}',
                is_read=random.choice([True, False])
            )

        # Create coupons
        for i in range(10):
            Coupon.objects.get_or_create(
                code=f'COUPON{i}',
                defaults={
                    'discount': random.randint(5, 50),
                    'valid_from': timezone.now(),
                    'valid_to': timezone.now() + timezone.timedelta(days=30),
                    'is_active': random.choice([True, False])
                }
            )

        self.stdout.write(self.style.SUCCESS('Successfully generated test data'))