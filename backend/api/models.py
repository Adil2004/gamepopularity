from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Language(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
class Platforms(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
class Game(models.Model):

    name = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    release_date = models.DateField()
    developer = models.CharField(max_length=100)
    publisher = models.CharField(max_length=100)
    supported_platforms = models.ManyToManyField(Platforms)
    age_restriction = models.IntegerField()
    languages = models.ManyToManyField(Language)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="games")

    def __str__(self):
        return self.name
    