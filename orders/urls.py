from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import add_to_cart
from .views import view_cart
from .views import update_order_status
from .views import OrderViewSet,WishlistViewSet

router = DefaultRouter()
router.register('placeorder', OrderViewSet)
router.register('wishlist', WishlistViewSet, basename='wishlist')


urlpatterns = [
    path('', include(router.urls)), 
    path('add_to_cart/',add_to_cart,name='add_to_cart'),
    path('view_cart/',view_cart,name='view_cart'),
    path('update_order_status/',update_order_status,name='update_order_status'),
]