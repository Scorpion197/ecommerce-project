from django.contrib import admin
from .models import UserAccount, Product, Subscription, Order


class AdminUserAccount(admin.ModelAdmin):
    list_display = ("first_name", "family_name", "email")
    search_fields = ("first_name", "family_name", "email")


class AdminProduct(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


class AdminSubscription(admin.ModelAdmin):
    list_display = ("owner_id", "created_at", "status", "started_at", "expires_at")


class AdminOrder(admin.ModelAdmin):
    list_display = ("user_id",)


# Register your models here.
admin.site.register(UserAccount, AdminUserAccount)
admin.site.register(Product, AdminProduct)
admin.site.register(Subscription, AdminSubscription)
admin.site.register(Order, AdminOrder)
