from dj_rest_auth.registration.serializers import (
    RegisterSerializer,
    VerifyEmailSerializer,
)
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *


class CustomVerifyEmailSerializer(VerifyEmailSerializer):
    def get_email_options(self):
        return {"html_email_template_name": "email_confirmation/confirm.html"}


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True, write_only=True)
    family_name = serializers.CharField(required=True, write_only=True)
    user_type = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(
        write_only=True,
        required=True,
        style={
            "input_type": "password",
        },
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={
            "input_type": "password",
        },
    )
    is_active = serializers.BooleanField(default=True, allow_null=True)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()

        data_dict["first_name"] = self.validated_data.get("first_name", "")
        data_dict["family_name"] = self.validated_data.get("family_name", "")
        data_dict["user_type"] = self.validated_data.get("user_type", "")
        data_dict["email"] = self.validated_data.get("email", "")
        data_dict["is_active"] = self.validated_data.get("is_active", True)
        return data_dict

    def save(self, request):
        user = super().save(request)
        return user


class CustomLoginSerializer(LoginSerializer):
    username = None
    email = serializers.EmailField(required=True)
    password = serializers.CharField(
        required=True,
        style={
            "input_type": "password",
        },
    )

    def authenticate(self, **kwargs):
        user = authenticate(self.context["request"], **kwargs)
        return user


class CustomUserDetailSerializer(UserDetailsSerializer):
    first_name = serializers.CharField(required=True, write_only=True)
    family_name = serializers.CharField(required=True, write_only=True)
    user_type = serializers.CharField(required=True)
    is_active = serializers.BooleanField(default=False)

    class Meta:
        model = UserAccount
        fields = ["id", "first_name", "family_name", "email", "user_type", "is_active"]


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "price", "size", "color", "image"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = [
            "id",
            "created_at",
            "status",
            "payment_validated",
            "user_id",
            "product_id",
        ]
