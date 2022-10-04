from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer, UserDetailsSerializer
from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import *


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
    is_active = serializers.BooleanField(default=False, allow_null=True)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()

        data_dict["first_name"] = self.validated_data.get("first_name", "")
        data_dict["family_name"] = self.validated_data.get("family_name", "")
        data_dict["user_type"] = self.validated_data.get("user_type", "")
        data_dict["email"] = self.validated_data.get("email", "")
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
        print("USER password: ", user.password)
        return user


class CustomUserDetailSerializer(UserDetailsSerializer):
    first_name = serializers.CharField(required=True, write_only=True)
    family_name = serializers.CharField(required=True, write_only=True)
    user_type = serializers.CharField(required=True)
    is_active = serializers.BooleanField(default=False)

    class Meta:
        model = UserAccount
        fields = ["id", "first_name", "family_name", "email", "user_type", "is_active"]
