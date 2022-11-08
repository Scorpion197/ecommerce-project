from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailAddress
from django.utils.translation import gettext_lazy as _
from django.http import JsonResponse
from .models import *
from .serializers import *
from datetime import datetime
from dateutil.relativedelta import relativedelta
import pytz

utc = pytz.UTC

# Create your views here.


class ProductViewSet(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request, *args, **kwargs):
        pass

    def put(self, request, *args, **kwargs):

        try:
            product_object = Product.objects.get(id=request.data["id"])
            product_object.name = request.data["name"]
            product_object.price = request.data["price"]
            product_object.color = request.data["color"]
            product_object.quantity = request.data["quantity"]
            product_object.barcode = request.data["barcode"]
            product_object.weight = request.data["weight"]
            product_object.sku = request.data["sku"]

            product_object.save()

            serializer = ProductSerializer(product_object)
            return Response(serializer.data)
        except Product.DoesNotExist:
            return Response({"message": "Product doesn't not exist"})

    def post(self, request, *args, **kwargs):
        new_product = Product.objects.create(
            name=request.data["name"],
            price=request.data["price"],
            quantity=request.data["quantity"],
            barcode=request.data["barcode"],
            weight=request.data["weight"],
            sku=request.data["sku"],
        )

        serializer = ProductSerializer(new_product)
        return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    response_data = []
    for product in products:
        product_images = ProductImage.objects.filter(product=product.id)

        serializer = ProductSerializer(product)
        product_image_serializer = ProductImageSerializer(product_images, many=True)
        response_data.append(
            {
                "id": serializer.data["id"],
                "name": serializer.data["name"],
                "price": serializer.data["price"],
                "color": serializer.data["color"],
                "quantity": serializer.data["quantity"],
                "created_at": serializer.data["created_at"],
                "category": Category.objects.get(id=product.category.id).name,
                "images": product_image_serializer.data,
            }
        )
    return Response(response_data)


@permission_classes([IsAuthenticated])
@api_view(["GET"])
def get_one_product(request, product_id=None):
    if product_id == None:
        return Response({"error": "Product id should be provided"})

    product = Product.objects.get(id=product_id)
    product_serializer = ProductSerializer(product)
    product_images = ProductImage.objects.filter(product=product.id)
    product_image_serializer = ProductImageSerializer(product_images, many=True)
    response_data = []
    response_data.append(
        {
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "color": product.color,
            "quantity": product.quantity,
            "created_at": product_serializer.data["created_at"],
            "category": Category.objects.get(id=product.category.id).name,
            "images": product_image_serializer.data,
        }
    )

    return JsonResponse(response_data[0], safe=False, status=200)


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
        pass

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

    def update(self, request, *args, **kwargs):
        request_data = request.data
        subscription_id = kwargs["pk"]
        new_subscription_status = request_data["status"]
        subscription_object = Subscription.objects.get(id=subscription_id)

        # admin accepted subscription
        if new_subscription_status == "running":
            subscription_object.status = new_subscription_status
            subscription_object.started_at = datetime.now()
            if subscription_object.duration == "ONE_MONTH":
                subscription_object.expires_at = utc.localize(
                    subscription_object.started_at + relativedelta(months=1)
                )
            elif subscription_object.duration == "TWO_MONTHS":
                subscription_object.expires_at = utc.localize(
                    subscription_object.started_at + relativedelta(months=2)
                )
            elif subscription_object.duration == "THREE_MONTHS":
                subscription_object.expires_at = utc.localize(
                    subscription_object.started_at + relativedelta(months=3)
                )

            subscription_object.save()
            serializer = SubscriptionSerializer(subscription_object)
            return Response(serializer.data, status=200)
        elif new_subscription_status == "pending":
            subscription_object.status = new_subscription_status
            subscription_object.save()
            serializer = SubscriptionSerializer(subscription_object)
            return Response(serializer.data, status=200)


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
