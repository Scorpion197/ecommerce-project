from django.contrib import admin
from .models import *


class AdminUserAccount(admin.ModelAdmin):
    list_display = ("first_name", "family_name", "email")
    search_fields = ("first_name", "family_name", "email")


class AdminProduct(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


class AdminSubscription(admin.ModelAdmin):
    list_display = ("owner_id", "created_at", "status", "started_at", "expires_at")


class AdminOrder(admin.ModelAdmin):
    list_display = ("client_fullname", "client_phone")


class ProductImageAdmin(admin.ModelAdmin):
    list_display = ("id",)


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)


class ShopAdmin(admin.ModelAdmin):
    list_display = ("shop_name",)


class SubscriptionTypeAdmin(admin.ModelAdmin):
    list_display = ("duration", "price")


# Register your models here.
admin.site.register(UserAccount, AdminUserAccount)
admin.site.register(Product, AdminProduct)
admin.site.register(Subscription, AdminSubscription)
admin.site.register(Order, AdminOrder)
admin.site.register(ProductImage, ProductImageAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Shop, ShopAdmin)
admin.site.register(SubscriptionType, SubscriptionTypeAdmin)
