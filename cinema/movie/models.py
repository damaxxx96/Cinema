from django.db import models

class Movie(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    genre = models.CharField(max_length=255)
    image = models.ImageField(upload_to="movie_images/", blank=True, null=True)