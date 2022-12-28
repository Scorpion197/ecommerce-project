from email.policy import default
from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils import timezone
from django.core.validators import RegexValidator
from enum import Enum
from datetime import datetime
from dateutil.relativedelta import relativedelta
from safedelete.models import SafeDeleteModel
from safedelete.models import HARD_DELETE_NOCASCADE
import uuid

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

    def create_superuser(self, email=None, user_type=None, password=None, phone=None):
        if not email:
            raise ValueError("User must have an email")
        if not password:
            raise ValueError("User must have a password")

        user_email = self.normalize_email(email)
        user = self.model(email=user_email)
        user.user_type = "admin"
        user.phone = phone
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
    return "/".join(["product_image", str(instance.id), filename])


class SizeChoices(Enum):
    SMALL = "S"
    MEDIUM = "M"
    LARGE = "L"
    EXTRA_LARGE = "XL"
    EXTRA_EXTRA_LARGE = "XXL"


class Shop(SafeDeleteModel):
    _safedelete_policy = HARD_DELETE_NOCASCADE
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


class Category(SafeDeleteModel):
    _safedelete_policy = HARD_DELETE_NOCASCADE
    name = models.CharField(max_length=200, blank=True, default="", null=True)

    def __str__(self) -> str:
        return self.name


class Product(SafeDeleteModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    _safedelete_policy = HARD_DELETE_NOCASCADE
    name = models.CharField(max_length=200, blank=True, null=True, default="")
    price = models.IntegerField(default=0)
    size = models.CharField(
        max_length=18,
        choices=[(size.name, size.value) for size in SizeChoices],
        default=SizeChoices.SMALL.value,
    )

    color = models.CharField(max_length=20, blank=True, null=True, default="")
    quantity = models.IntegerField(default=0, blank=True, null=True)
    created_at = models.DateTimeField(default=datetime.now(), blank=True, null=True)
    category = models.ForeignKey(Category, null=True, on_delete=models.CASCADE)
    weight = models.IntegerField(default=0, null=True, blank=True)
    sku = models.CharField(max_length=20, default="", null=True, blank=True)
    barcode = models.CharField(max_length=50, default="", null=True, blank=True)
    link = models.CharField(max_length=300, blank=True, null=True, default="")
    shop = models.ForeignKey(Shop, null=True, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name


class ProductImage(SafeDeleteModel):
    _safedelete_policy = HARD_DELETE_NOCASCADE
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=True, default=None, to_field="id"
    )

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


class Subscription(SafeDeleteModel):
    _safedelete_policy = HARD_DELETE_NOCASCADE
    created_at = models.DateTimeField(default=datetime.now(), null=True, blank=True)
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
    started_at = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    expires_at = models.DateTimeField(default=datetime.now(), null=True, blank=True)
    status = models.CharField(
        max_length=15,
        choices=[(stat.name, stat.value) for stat in SubscriptionStatus],
        default=SubscriptionStatus.expired.value,
    )


class OrderStatus(Enum):
    COMPLETED = "COMPLETED"
    PENDING = "PENDING"


class Order(SafeDeleteModel):
    _safedelete_policy = HARD_DELETE_NOCASCADE
    created_at = models.DateTimeField(default=timezone.now(), null=True, blank=True)
    status = models.CharField(
        max_length=10,
        choices=[
            (order_status.name, order_status.value) for order_status in OrderStatus
        ],
        default=OrderStatus.PENDING.value,
    )
    payment_validated = models.BooleanField(default=False)
    product_id = models.ForeignKey(
        Product,
        to_field="id",
        default=None,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    client_fullname = models.CharField(max_length=50, null=True, blank=True, default="")
    wilaya = models.CharField(max_length=30, default="", null=True, blank=True)
    client_phone = models.CharField(
        max_length=13, default="", null=True, blank=True, validators=[num_regex]
    )

    address = models.CharField(max_length=100, default="", null=True, blank=True)
    payment_amount = models.PositiveIntegerField(default=0, null=True, blank=True)
    shop = models.ForeignKey(
        Shop,
        to_field="id",
        default=None,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
