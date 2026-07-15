from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Game, Language, Platforms

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LanguageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Language
        fields = ["id", "name"]

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platforms
        fields = ["id", "name"]

class GameSerializer(serializers.ModelSerializer):
    languages = LanguageSerializer(many=True, read_only=True)
    supported_platforms = PlatformSerializer(many=True, read_only=True)
    language_ids = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Language.objects.all(),
        source="languages",
        write_only=True
    )
    supported_platforms_id = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Platforms.objects.all(),
        source="supported_platforms",
        write_only=True
    )
    class Meta:
        model = Game
        fields = ["id", "name", "genre", "release_date", 
                  "developer", "publisher", 
                  "supported_platforms", 
                  "age_restriction", "languages", 
                  "language_ids", "supported_platforms_id", "price"]
        