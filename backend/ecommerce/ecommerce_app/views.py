from curses.ascii import HT
from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.


def home(request):
    html = "<h1>hello from app </h1>"
    send_mail(
        "Web developer internship",
        "opportunity",
        "doudou.gaw@gmail.com",
        ["kamelgaouaoui197@gmail.com"],
    )

    return HttpResponse(html)
