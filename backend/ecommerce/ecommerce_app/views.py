from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailAddress
from django.utils.translation import gettext_lazy as _
from django.http import JsonResponse
from .models import *
from .serializers import *

# Create your views here.


class ProductsViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


class CustomVerifyEmailView(APIView, ConfirmEmailView):
    permission_classes = (AllowAny,)
    allowed_methods = ("POST", "OPTIONS", "HEAD")

    def get_serializer(self, *args, **kwargs):
        return VerifyEmailSerializer(*args, **kwargs)

    def get(self, request, *args, **kwargs):
        print("REQUEST: ", request)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.kwargs["key"] = serializer.validated_data["key"]
        confirmation = self.get_object()
        confirmation.confirm(self.request)
        return Response({"detail": _("ok")}, status=status.HTTP_200_OK)


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]
    filter_fields = ["is_valid", "duration", "created_at"]


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_subscriptions(request):
    queryset = Subscription.objects.all()
    data = []

    for subscription in queryset:
        subscription_owner_email = subscription.owner.email
        serializer = SubscriptionSerializer(subscription)
        try:

            email_account = EmailAddress.objects.get(email=subscription_owner_email)
            data.append(
                {
                    "id": subscription.id,
                    "owner_first_name": subscription.owner.first_name,
                    "owner_family_name": subscription.owner.family_name,
                    "owner_email": subscription.owner.email,
                    "owner_phone": subscription.owner.phone,
                    "created_at": serializer.data["created_at"],
                    "duration": subscription.duration,
                    "started_at": serializer.data["started_at"],
                    "status": subscription.status,
                    "expires_at": serializer.data["expires_at"],
                    "email_verified": str(email_account.verified),
                }
            )

        except EmailAddress.DoesNotExist:
            print("Error occured while trying to get owner email")
            continue

    return JsonResponse(data, safe=False, status=200)
