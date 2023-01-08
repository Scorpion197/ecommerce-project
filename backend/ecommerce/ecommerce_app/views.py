from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from dj_rest_auth.models import TokenModel
from allauth.account import app_settings as allauth_settings
from dj_rest_auth.app_settings import create_token
from allauth.account.utils import complete_signup, send_email_confirmation
from allauth.account.views import ConfirmEmailView
from allauth.account.models import EmailAddress
from dj_rest_auth.registration.views import RegisterView
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.http import JsonResponse
from .models import *
from .serializers import *
from .permissions import *
from datetime import datetime
from dateutil.relativedelta import relativedelta
import pytz
import random

utc = pytz.UTC

# Create your views here.


class ProductViewSet(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        token = request.headers["Authorization"].replace("Token", "").replace(" ", "")
        shop = Shop.objects.get(owner__auth_token__key=token)
        products = Product.objects.filter(shop=shop, is_deleted=False)
        response_data = []
        for product in products:
            product_images = ProductImage.objects.filter(product=product)
            images_array = []
            for image in product_images:
                images_array.append(str(image.image))

            serializer = ProductSerializer(product)

            response_data.append(
                {
                    "id": serializer.data["id"],
                    "name": serializer.data["name"],
                    "price": serializer.data["price"],
                    "color": serializer.data["color"],
                    "quantity": serializer.data["quantity"],
                    "created_at": serializer.data["created_at"],
                    "category": Category.objects.get(id=product.category.id).name,
                    "images": images_array,
                }
            )
        return JsonResponse(response_data, safe=False, status=200)

    def put(self, request, *args, **kwargs):

        product_object = Product.objects.get(id=int(request.data["id"]))
        product_object.name = request.data["name"]
        product_object.price = request.data["price"]
        product_object.color = request.data["color"]
        product_object.quantity = request.data["quantity"]
        product_object.barcode = request.data["barcode"]
        product_object.weight = request.data["weight"]
        product_object.category = Category.objects.get(name=request.data["category"])
        product_object.sku = request.data["sku"]
        product_object.save()

        product_images = request.data["images"].split(",")

        for i in range(len(product_images)):
            product_images[i] = product_images[i].replace("/media/", "")
            try:
                product_image_object = ProductImage.objects.get(
                    product=product_object, image=product_images[i]
                )
            except ProductImage.DoesNotExist:
                new_product_image = ProductImage.objects.create(
                    product=product_object, image=product_images[i]
                )

        serializer = ProductSerializer(product_object)
        return Response(serializer.data, status=200)

    def post(self, request, *args, **kwargs):

        category, created = Category.objects.get_or_create(
            name=request.data["category"]
        )

        new_product = Product.objects.create(
            name=request.data["name"],
            price=request.data["price"],
            quantity=request.data["quantity"],
            barcode=request.data["barcode"],
            weight=request.data["weight"],
            sku=request.data["sku"],
            color=request.data["color"],
            category=category,
        )

        images_name = request.data["images"].split(",")
        for i in range(len(images_name)):
            images_name[i] = images_name[i].replace("/media/", "")

        for image in images_name:
            image_object = ProductImage.objects.get(image=image)
            image_object.product = new_product
            image_object.save()

        shop = Shop.objects.get(owner__auth_token__key=request.data["token"])
        new_product.shop = shop
        new_product.link = f"{shop.shop_name}/{new_product.id}"
        new_product.save()
        serializer = ProductSerializer(new_product)
        return Response(serializer.data)


class ListSubscriptionType(viewsets.ViewSet):

    permission_classes = [AllowAny]

    def list(self, request):
        queryset = SubscriptionType.objects.all()
        serializer = SubscriptionTypesSerializer(queryset, many=True)
        return Response(serializer.data)


class AddSubscriptionType(APIView):
    permission_classes = [AdminPermission]

    def post(self, request, *args, **kwargs):
        serializer = SubscriptionTypesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)


class ColorViewSet(viewsets.ModelViewSet):
    permission_classes = [AdminPermission, IsAuthenticated]
    serializer_class = ColorSerializer
    queryset = Color.objects.all()


class AdminCreationView(APIView):
    serializer_class = CustomUserDetailSerializer
    token_model = TokenModel

    def post(self, request, *args, **kwargs):
        data = request.data
        try:
            new_user = UserAccount(
                first_name=data["firstName"],
                family_name=data["familyName"],
                email=data["email"],
                phone=data["phone"],
            )
            new_user.set_password(data["password"])
            new_user.is_staff = True
            new_user.is_superuser = True
            new_user.is_active = True
            new_user.user_type = "ADMIN"
            new_user.save()
            serializer = CustomUserDetailSerializer(new_user)
            Token.objects.create(user=new_user)
            token = Token.objects.get(user=new_user)
            data = serializer.data
            data["token"] = token.key

            return Response(data, status=200)
        except:
            return Response({"status": "error occured"}, status=400)


class CustomRegistrationView(RegisterView):
    serializer_class = CustomRegisterSerializer
    token_model = TokenModel

    def get_response_data(self, user):
        return super().get_response_data(user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        data = request.data
        try:
            UserAccount.objects.get(email=data["email"])
            return Response({"Error": "Email already used"}, status=400)
        except UserAccount.DoesNotExist:
            pass
        try:
            Shop.objects.get(shop_name=data["shop"]["shop_name"])
            return Response({"Error": "Shop name already exists"}, status=400)
        except Shop.DoesNotExist:
            pass
        if serializer.is_valid():
            user = serializer.save(request)
            create_token(self.token_model, user, serializer)
            Shop.objects.create(owner=user, shop_name=data["shop"]["shop_name"])
            subscription_instance = SubscriptionType.objects.get(
                id=data["subscription"]["id"]
            )
            Subscription.objects.create(
                owner=user,
                status=SubscriptionStatus.pending.value,
                created_at=utc.localize(datetime.now()),
                expires_at=None,
                subscription_type=subscription_instance,
            )

            complete_signup(request, user, allauth_settings.EMAIL_VERIFICATION, None)
            send_email_confirmation(request, user)
            token = self.token_model.objects.get(user=user)
            data = serializer.data
            data["token"] = token.key
            return Response(data, status=201)
        else:
            print("Error occured: ", serializer.errors)
            return Response(serializer.errors, status=204)


class ProductDetailView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(
                {"message": "Product not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def get(self, request, pk):
        product = self.get_object(pk)
        product_images = ProductImage.objects.filter(product=product)
        images_array = []

        for image in product_images:
            images_array.append(str(image.image))

        serializer = ProductSerializer(product)
        return JsonResponse(
            {
                "id": serializer.data["id"],
                "name": serializer.data["name"],
                "price": serializer.data["price"],
                "color": serializer.data["color"],
                "quantity": serializer.data["quantity"],
                "created_at": serializer.data["created_at"],
                "weight": serializer.data["weight"],
                "barcode": serializer.data["barcode"],
                "sku": serializer.data["sku"],
                "category": Category.objects.get(id=product.category.id).name,
                "images": images_array,
            },
            safe=False,
            status=200,
        )

    def delete(self, request, pk):
        product = self.get_object(pk)
        product.delete()
        return Response({"message": "Product deleted successfully"}, status=200)


class UploadImageView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print(request.data)
        product_image_serializer = ProductImageSerializer(data=request.data)
        if product_image_serializer.is_valid():
            product_image_serializer.save()

            return Response(
                {"image": product_image_serializer.data["image"].replace("/media/", "")}
            )
        else:
            return Response(product_image_serializer.errors)


class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        owner = UserAccount.objects.get(email=self.request.user)
        return Order.objects.filter(shop__owner=owner)

    def create(self, request, *args, **kwargs):
        new_order = Order.objects.create(
            client_fullname=request.data["client_fullname"],
            wilaya=request.data["wilaya"],
            client_phone=request.data["client_phone"],
            address=request.data["address"],
            product_id=Product.objects.get(id=request.data["product_id"]),
            payment_amount=request.data["payment_amount"],
        )

        serializer = OrderSerializer(new_order, many=False)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def destroy(self, request, *args, **kwargs):
        pk = kwargs["pk"]
        category_object = Category.objects.get(pk=pk)
        related_products = Product.objects.filter(category=pk)
        for product in related_products:
            product.is_deleted = True
            product.save()

        category_object.delete()
        return Response({"status": "done"}, status=200)


class VendorsViewSet(viewsets.ModelViewSet):
    queryset = UserAccount.objects.filter(user_type="VENDOR")
    serializer_class = CustomUserDetailSerializer
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
    permission_classes = [AdminPermission]
    filter_fields = ["is_valid", "duration", "created_at"]

    def get(self, request, *args, **kwargs):
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


class UpdateVendorView(generics.UpdateAPIView):
    serializer_class = UserDetailsSerializer
    permission_classes = [VendorAuthPermission]
    queryset = UserAccount.objects.filter(user_type="VENDOR")

    def update(self, request, *args, **kwargs):
        token = request.headers["Authorization"].replace("Token", "").replace(" ", "")
        user = UserAccount.objects.get(auth_token=token)
        user.first_name = request.data["first_name"]
        user.family_name = request.data["family_name"]
        user.phone = request.data["phone"]
        user.email = request.data["email"]
        shop = Shop.objects.get(owner=user)
        shop.shop_name = request.data["shop_name"]
        shop.save()
        user.save()
        serializer = CustomUserDetailSerializer(user)
        return Response(serializer.data)


class UpdateEmailVendorView(generics.UpdateAPIView):
    serializer_class = CustomUserDetailSerializer
    permission_classes = [VendorAuthPermission]
    queryset = UserAccount.objects.filter(user_type="VENDOR")

    def update(self, request, *args, **kwargs):
        token = request.headers["Authorization"].replace("Token", "").replace(" ", "")
        user = UserAccount.objects.get(auth_token=token)
        user.email = request.data["newEmail"]
        user.set_active = False
        user.reset_code = random.randint(10000, 100000)
        user.save()

        # send email to user
        mail_subject = "Email confirmation"
        mail_content = f"Your confirmation code is: {user.reset_code}"

        send_mail(
            mail_subject,
            mail_content,
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        serializer = CustomUserDetailSerializer(user)
        return Response(serializer.data)


class ConfirmResetCodeView(APIView):
    permission_classes = [VendorAuthPermission]

    def post(self, request, *args, **kwargs):

        token = request.headers["Authorization"].replace("Token ", "").replace(" ", "")
        token_object = Token.objects.get(key=token)
        token_object.delete()
        user = UserAccount.objects.get(email=request.data["email"])
        reset_code = request.data["reset_code"]
        if user.reset_code == int(reset_code):
            user.reset_code = random.randint(10000, 100000)
            user.set_active = True

            user.save()
            EmailAddress.objects.create(email=user.email, user=user, verified=True)
            old_email_object = EmailAddress.objects.get(email=request.data["oldEmail"])
            old_email_object.delete()
            message = {"verified": True}
            return Response(message, status=200)

        message = {"verified": False}
        return Response(message, status=400)


class VendorDetailView(APIView):
    permission_classes = [VendorAuthPermission]

    def get(self, request, *args, **kwargs):
        token = request.headers["Authorization"].replace("Token", "").replace(" ", "")
        vendor = UserAccount.objects.get(auth_token=token)
        serializer = CustomUserDetailSerializer(vendor)
        shop = Shop.objects.get(owner=vendor)
        data = serializer.data
        data["shop_name"] = shop.shop_name
        return JsonResponse(data, safe=False, status=200)


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


@permission_classes([AllowAny])
@api_view(["GET"])
def get_client_products(request):
    products = Product.objects.all()
    response_data = []
    for product in products:
        product_images = ProductImage.objects.filter(product=product)
        images_array = []
        for image in product_images:
            images_array.append(str(image.image))
        serializer = ProductSerializer(product)
        response_data.append(
            {
                "id": serializer.data["id"],
                "name": serializer.data["name"],
                "price": serializer.data["price"],
                "color": serializer.data["color"],
                "quantity": serializer.data["quantity"],
                "created_at": serializer.data["created_at"],
                "category": Category.objects.get(id=product.category.id).name,
                "images": images_array,
            }
        )
    return JsonResponse(response_data, safe=False, status=200)


@permission_classes([AllowAny])
@api_view(["GET"])
def get_one_client_product(request, pk):
    product = Product.objects.get(pk=pk)
    product_images = ProductImage.objects.filter(product=product)
    images_array = []

    for image in product_images:
        images_array.append(str(image.image))

    serializer = ProductSerializer(product)
    return JsonResponse(
        {
            "id": serializer.data["id"],
            "name": serializer.data["name"],
            "price": serializer.data["price"],
            "color": serializer.data["color"],
            "quantity": serializer.data["quantity"],
            "created_at": serializer.data["created_at"],
            "weight": serializer.data["weight"],
            "barcode": serializer.data["barcode"],
            "sku": serializer.data["sku"],
            "category": Category.objects.get(id=product.category.id).name,
            "images": images_array,
        },
        safe=False,
        status=200,
    )


@api_view(["POST"])
def admin_login(request):
    user = authenticate(email=request.data["email"], password=request.data["password"])
    if user:
        if user.user_type == "admin":
            token = Token.objects.get_or_create(user_id=user.id)[0].key
            return Response({"token": token}, status=200)
        else:
            return Response({"message": "not allowed"}, status=401)
    return Response({"message": "not allowed"}, status=401)
