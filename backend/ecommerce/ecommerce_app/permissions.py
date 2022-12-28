from rest_framework import permissions
from .models import UserAccount


class AdminPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        user = UserAccount.objects.get(email=request.user)
        return bool(user.user_type == "admin")
