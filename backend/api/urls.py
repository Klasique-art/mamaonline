from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet,
    SubCategoryViewSet,
    ProductViewSet,
    AttributeChoiceViewSet,
    OrderViewSet,
    ReviewViewSet,
    UserViewSet,
    MessageViewSet,
    CouponViewSet
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'subcategories', SubCategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'attribute-choices', AttributeChoiceViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'users', UserViewSet)
router.register(r'messages', MessageViewSet, basename='message')
router.register(r'coupons', CouponViewSet)

urlpatterns = [
    path('', include(router.urls)),
]