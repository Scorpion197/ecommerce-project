from tkinter.ttk import Style
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from .models import *


class CustomRegisterSerializer(RegisterSerializer):
    username = None
    first_name = serializers.CharField(required=True, write_only=True)
    family_name = serializers.CharField(required=True, write_only=True)
    user_type = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    password2 = serializers.CharField(
        write_only=True, required=True, style={"input_type": "password"}
    )
    is_active = serializers.BooleanField(default=False)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict["first_name"] = self.validated_data.get("first_name", "")
        data_dict["family_name"] = self.validated_data.get("family_name", "")
        data_dict["user_type"] = self.validated_data.get("user_type", "")
        data_dict["email"] = self.validated_data.get("email", "")
        data_dict["is_active"] = self.validated_data.get("is_active", False)
        return data_dict

    def save(self, request):
        user = super().save(request)
        return user
