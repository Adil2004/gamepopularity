from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import GameSerializer, PlatformSerializer
from rest_framework.permissions import AllowAny
from .models import Game, Platforms
from .ml.predict import predict_game

@api_view(["POST"])
def predict(request):
    print(request.data)
    result = predict_game(request.data)
    return Response(result)

class DashboardView(generics.ListAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer
    permission_classes = [AllowAny]

class GameListCreateView(generics.ListCreateAPIView):
    serializer_class = GameSerializer
    permission_classes = [AllowAny]
    

class PlatformListView(generics.ListAPIView):
    queryset = Platforms.objects.all()
    serializer_class = PlatformSerializer
    permission_classes = [AllowAny]
    