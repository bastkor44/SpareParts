from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import register_user
from .views import LoginView

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', LoginView, name='login'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
