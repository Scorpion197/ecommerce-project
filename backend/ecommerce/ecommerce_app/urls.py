from ast import ListComp
from django.urls import path, re_path, include
from dj_rest_auth.registration.views import (
    RegisterView,
    VerifyEmailView,
    ConfirmEmailView,
)
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
router.register("products", ProductsViewSet, basename="manage_products")
router.register("orders", OrderViewSet, basename="manage_orders")

# Auth routes
urlpatterns = [
    path("register/", RegisterView.as_view()),
    path(
        "account-confirm-email/",
        VerifyEmailView.as_view(),
        name="account_email_verification_sent",
    ),
    path("account-confirm-email/<str:key>/", ConfirmEmailView.as_view()),
    re_path(
        r"^account-confirm-email/(?P<key>[-:\w]+)/$",
        VerifyEmailView.as_view(),
        name="account_confirm_email",
    ),
    # path("accounts/", include("allauth.urls"), name="socialaccount_signup"),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("verify-email/", VerifyEmailView.as_view(), name="rest_verify_email"),
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
]

urlpatterns += router.urls
