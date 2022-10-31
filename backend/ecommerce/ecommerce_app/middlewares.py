from .models import UserAccount, Subscription
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from datetime import datetime


class SubscriptionMiddleWare:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):

        if "Authorization" in request.headers:
            token = request.headers["Authorization"].replace("Token ", "")
            try:
                user_account = UserAccount.objects.get(auth_token=token)
                if user_account.user_type == "ADMIN":
                    response = self.get_response(request)
                    return response

                if datetime.now() == user_account.subscription.expires_at:
                    user_token_object = Token.objects.get(key=token)
                    user_token_object.delete()
                    subscription_object = user_account.subscription
                    subscription_object.status = "expired"
                    subscription_object.save()

                response = self.get_response(request)
                return response

            except Exception as e:
                print(e)
                response = self.get_response(request)
                return response
