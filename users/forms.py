"""from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import CustomUser

class SignupForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'phone', 'address']

    def save(self, commit=True):
        user = super().save(commit=False)
        if commit:
            user.save()
        return user"""
