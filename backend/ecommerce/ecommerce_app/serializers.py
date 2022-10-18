from sre_constants import MAX_UNTIL
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


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ["id", "shop_name", "owner"]


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ["id", "created_at", "duration", "owner", "is_valid"]


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True, write_only=True)
    family_name = serializers.CharField(required=True, write_only=True)
    user_type = serializers.CharField(required=False)
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
    phone = serializers.CharField(max_length=10, required=True, validators=[num_regex])
    shop = ShopSerializer(required=True, allow_null=True)
    subscription = SubscriptionSerializer(required=True, allow_null=True)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()

        data_dict["first_name"] = self.validated_data.get("first_name", "")
        data_dict["family_name"] = self.validated_data.get("family_name", "")
        data_dict["user_type"] = self.validated_data.get("user_type", "VENDOR")
        data_dict["phone"] = self.validated_data.get("phone", "")
        data_dict["email"] = self.validated_data.get("email", "")
        data_dict["is_active"] = self.validated_data.get("is_active", True)
        return data_dict

    def save(self, request):
        user = super().save(request)
        try:
            shop = self._validated_data["shop"] or None
            subscription = self._validated_data["subscription"] or None
            subs_duration = subscription.get("duration")
            name = shop.get("shop_name")
            Shop.objects.create(owner=user, shop_name=name)
            Subscription.objects.create(
                owner=user, duration=subs_duration, is_valid=False
            )

            return user

        except:
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
