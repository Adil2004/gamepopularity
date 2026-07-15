from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, GameSerializer, LanguageSerializer, PlatformSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Game, Platforms, Language
from .ml.predict import predict_game

# Create your views here.
@api_view(["POST"])
def predict(request):
    print(request.data)
    result = predict_game(request.data)
    return Response(result)

class DashboardView(generics.ListAPIView):
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Game.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class GameListCreateView(generics.ListCreateAPIView):
    serializer_class = GameSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Game.objects.filter(author = user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author = self.request.user)
        else:
            print(serializer.errors)

class LanguageListView(generics.ListAPIView):
    queryset = Language.objects.all()
    serializer_class = LanguageSerializer
    permission_classes = [IsAuthenticated]

class PlatformListView(generics.ListAPIView):
    queryset = Platforms.objects.all()
    serializer_class = PlatformSerializer
    permission_classes = [IsAuthenticated]
    