from curses.ascii import HT
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def home(request):
    html = "<h1>hello from app </h1>"
    return HttpResponse(html)
