from email.policy import default
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from enum import Enum
from django.utils import timezone
from django.core.validators import RegexValidator

num_regex = RegexValidator(r"^[0-9]*$", "only numbers are allowed")

# Create your models here.
class UserTypes(Enum):
    VENDOR = "VENDOR"
    CLIENT = "CLIENT"
    ADMIN = "ADMIN"


class UserAccountManager(BaseUserManager):
    def create_user(self, email=None, user_type=None, password=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user_email = self.normalize_email(email)
        user = self.model(email=user_email)
        user.user_type = user_type
        user.is_staff = False
        user.is_superuser = False
        user.is_active = False
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email=None, user_type=None, password=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user_email = self.normalize_email(email)
        user = self.model(email=user_email)
        user.user_type = user_type
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.set_password(password)
        user.save()
        return user


class UserAccount(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=30, default="")
    email = models.EmailField(max_length=100, unique=True)
    first_name = models.CharField(max_length=100, blank=True, null=True, default="")
    family_name = models.CharField(max_length=100, blank=True, null=True, default="")
    is_active = models.BooleanField(default=True, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    phone = models.CharField(
        max_length=13, default="", null=True, blank=True, validators=[num_regex]
    )
    user_type = models.CharField(
        max_length=8,
        choices=[(type.name, type.value) for type in UserTypes],
        default=UserTypes.VENDOR.value,
    )
    objects = UserAccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phone"]

    def get_user_type(self):
        return self.user_type

    def get_user_id(self):
        return self.id

    def __str__(self):
        return self.email


def upload_product_image(instance, filename):
    return "/".join(["product_image", str(instance.id) + "/", filename])


class SizeChoices(Enum):
    SMALL = "S"
    MEDIUM = "M"
    LARGE = "L"
    EXTRA_LARGE = "XL"
    EXTRA_EXTRA_LARGE = "XXL"


class Shop(models.Model):
    shop_name = models.CharField(max_length=20, default="", null=True, blank=True)
    owner = models.OneToOneField(
        UserAccount,
        related_name="shop",
        on_delete=models.CASCADE,
        default=None,
        null=True,
        blank=True,
    )

    def __str__(self):
        return self.shop_name


class Product(models.Model):
    name = models.CharField(max_length=200, blank=True, null=True, default="")
    price = models.IntegerField(default=0)
    size = models.CharField(
        max_length=18,
        choices=[(size.name, size.value) for size in SizeChoices],
        default=SizeChoices.SMALL.value,
    )

    color = models.CharField(max_length=20, blank=True, null=True, default="")
    image = models.ImageField(
        upload_to=upload_product_image, blank=True, null=True, default=None
    )


class SubscriptionDuration(Enum):
    ONE_MONTH = "ONE_MONTH"
    TWO_MONTHS = "TWO_MONTHS"
    THREE_MONTHS = "THREE_MONTHS"


class SubscriptionStatus(Enum):
    pending = "pending"
    running = "running"
    expired = "expired"


class Subscription(models.Model):
    created_at = models.DateTimeField(default=timezone.now(), null=True, blank=True)
    duration = models.CharField(
        max_length=15,
        choices=[(dur.name, dur.value) for dur in SubscriptionDuration],
        default=SubscriptionDuration.ONE_MONTH.value,
    )
    owner = models.OneToOneField(
        UserAccount,
        related_name="subscription",
        on_delete=models.CASCADE,
        default=None,
        null=True,
    )
    started_at = models.DateTimeField(default=timezone.now(), null=True, blank=True)
    expires_at = models.DateTimeField(default=timezone.now(), null=True, blank=True)
    status = models.CharField(
        max_length=15,
        choices=[(stat.name, stat.value) for stat in SubscriptionStatus],
        default=SubscriptionStatus.expired.value,
    )


class OrderStatus(Enum):
    COMPLETED = "COMPLETED"
    PENDING = "PENDING"


class Order(models.Model):
    created_at = models.DateTimeField(default=timezone.now(), null=True, blank=True)
    status = models.CharField(
        max_length=10,
        choices=[
            (order_status.name, order_status.value) for order_status in OrderStatus
        ],
        default=OrderStatus.PENDING.value,
    )
    payment_validated = models.BooleanField(default=False)
    user_id = models.ForeignKey(UserAccount, to_field="id", on_delete=models.CASCADE)
    product_id = models.ForeignKey(
        Product, to_field="id", default="", on_delete=models.CASCADE
    )
