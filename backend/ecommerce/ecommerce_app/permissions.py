from rest_framework import permissions, authentication
from .models import UserAccount


class AdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = UserAccount.objects.get(email=request.user)
        return bool(user.user_type == "admin")


class VendorAuthPermission(permissions.BasePermission):
    ADMIN_ONLY_AUTH_CLASSES = [
        authentication.BasicAuthentication,
        authentication.TokenAuthentication,
    ]

    def has_permission(self, request, view) -> bool:
        user = UserAccount.objects.get(email=request.user)
        return bool(user.is_authenticated and (user.user_type == "VENDOR"))
