from dj_rest_auth.registration.serializers import (
    RegisterSerializer,
    VerifyEmailSerializer,
)
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from django.conf import settings
from allauth.account.models import EmailAddress
from .models import *
from datetime import datetime
import pytz

utc = pytz.UTC


class CustomVerifyEmailSerializer(VerifyEmailSerializer):
    def get_email_options(self):
        return {"html_email_template_name": "email_confirmation/confirm.html"}


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = ["id", "shop_name", "owner"]


class EmailAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailAddress
        fields = "__all__"


class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = "__all__"


class SubscriptionTypesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionType
        fields = "__all__"


class CustomUserDetailSerializer(UserDetailsSerializer):
    first_name = serializers.CharField(required=True)
    family_name = serializers.CharField(required=True)
    user_type = serializers.CharField(required=False)
    is_active = serializers.BooleanField(default=False)

    class Meta:
        model = UserAccount
        fields = [
            "id",
            "first_name",
            "family_name",
            "email",
            "user_type",
            "is_active",
            "phone",
        ]


class SubscriptionSerializer(serializers.ModelSerializer):
    owner = CustomUserDetailSerializer(required=False)

    class Meta:
        model = Subscription
        fields = "__all__"


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True, write_only=True)
    family_name = serializers.CharField(required=True, write_only=True)
    user_type = serializers.CharField(required=False)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(
        write_only=True,
        required=True,
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
    )

    is_active = serializers.BooleanField(default=True, allow_null=True)
    phone = serializers.CharField(max_length=13, required=True, validators=[num_regex])
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
        print("DATA DICT: ", data_dict)
        return data_dict

    def save(self, request):
        user = super().save(request)
        try:
            mail_content = "A new subscription has been requested"
            mail_subject = "New subscription"
            # send email to admin
            send_mail(
                mail_subject,
                mail_content,
                settings.EMAIL_HOST_USER,
                [
                    "kamelprim197@gmail.com",
                ],
                fail_silently=False,
            )

            return user

        except Exception as e:
            print("Error occured: ", e)
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

    #! change later
    def authenticate(self, **kwargs):
        user = authenticate(self.context["request"], **kwargs)
        if user and user.set_active:
            if user.user_type == "ADMIN":
                return user
            elif user.user_type == "VENDOR":
                if user.subscription.status == "expired":
                    return None
                elif utc.localize(datetime.now()) > user.subscription.expires_at:
                    if user.subscription.status != "expired":
                        subscription_object = user.subscription
                        subscription_object.status = "expired"
                        subscription_object.save()
                        return None
                    return None

                return user

        return None


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(many=False)

    class Meta:
        model = Product
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    product_id = serializers.StringRelatedField(many=False)

    class Meta:
        model = Order
        fields = "__all__"


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = [
            "image",
        ]


class VerifyEmailSerializer(serializers.Serializer):
    key = serializers.CharField(write_only=True)
