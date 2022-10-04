from django.urls import path, re_path, include
from dj_rest_auth.registration.views import (
    RegisterView,
    VerifyEmailView,
    ConfirmEmailView,
)
from dj_rest_auth.views import LogoutView, LoginView
from .views import *

urlpatterns = [
    path("", home, name="home_page"),
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
    path("accounts/", include("allauth.urls"), name="socialaccount_signup"),
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
]
