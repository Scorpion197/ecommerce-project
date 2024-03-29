from ast import ListComp
from django.urls import path, re_path, include
from dj_rest_auth.registration.views import (
    ConfirmEmailView,
    ResendEmailVerificationView,
)  # ! overwrite this one later
from dj_rest_auth.views import LogoutView, LoginView
from rest_framework import routers
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from .views import *

schema_view = get_schema_view(
    openapi.Info(
        title="Backend API",
        default_version="v1",
        description="Ecommerce web application",
        contact=openapi.Contact("doudou.gaw@gmail.com"),
        license=openapi.License(name="BSD license"),
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

# Store routes
router = routers.DefaultRouter()
router.register("orders", OrderViewSet, basename="manage_orders")
router.register("subscriptions", SubscriptionViewSet, basename="manage_subscriptions")
router.register("categories", CategoryViewSet, basename="manage_categories")
router.register("vendors", VendorsViewSet, basename="manage_vendors")
router.register("colors", ColorViewSet, basename="manage_colors")
router.register(
    "subscriptionlist", ListSubscriptionType, basename="manage_subscription_types"
)

# Auth routes
urlpatterns = [
    path("register/", CustomRegistrationView.as_view()),
    path(
        "account-confirm-email/<str:key>/", ConfirmEmailView.as_view()
    ),  # ! later try to customize this
    path(
        "account-confirm-email/",
        ConfirmEmailView.as_view(),
        name="account_email_verification_sent",
    ),
    # path("accounts/", include("allauth.urls"), name="socialaccount_signup"),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("resend-email/", ResendEmailVerificationView.as_view()),
    re_path(
        r"^account-confirm-email/",
        ConfirmEmailView.as_view(),
        name="account_email_verification_sent",
    ),
    re_path(
        r"^account-confirm-email/(?P<key>[-:\w]+)/$",
        ConfirmEmailView.as_view(),
        name="account_confirm_email",
    ),
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
    path("products/", ProductViewSet.as_view(), name="manage_products"),
    path("products/<uuid:pk>/", ProductDetailView.as_view(), name="manage_product"),
    path("upload-image/", UploadImageView.as_view(), name="upload_image"),
    path("client-products/", get_client_products, name="client_products"),
    path(
        "client-products/<uuid:pk>/", get_one_client_product, name="one_client_product"
    ),
    path("auth/admin/login/", admin_login, name="admin_login"),
    path("update-vendor/", UpdateVendorView.as_view(), name="update_vendor"),
    path("vendor-detail/", VendorDetailView.as_view(), name="vendor_detail"),
    path(
        "update-vendor-email/",
        UpdateEmailVendorView.as_view(),
        name="update_vendor_email",
    ),
    path(
        "confirm-reset-code/", ConfirmResetCodeView.as_view(), name="confirm_reset_code"
    ),
    path("create-admin/", AdminCreationView.as_view(), name="create_admin"),
    path("add-subscription/", AddSubscriptionType.as_view(), name="add_subscription"),
]

urlpatterns += router.urls
