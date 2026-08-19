from rest_framework import serializers
from .models import Game, Platforms

class PlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = Platforms
        fields = ["id", "name"]

class GameSerializer(serializers.ModelSerializer):
    supported_platforms = PlatformSerializer(many=True, read_only=True)
    supported_platforms_id = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Platforms.objects.all(),
        source="supported_platforms",
        write_only=True
    )
    class Meta:
        model = Game
        fields = ["id", "name", "genre", 
                  "developer", "publisher", 
                  "supported_platforms", 
                  "age_restriction", "languages", 
                  "language_ids", "supported_platforms_id", "price"]
        