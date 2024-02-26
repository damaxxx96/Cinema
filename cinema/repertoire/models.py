from django.db import models
from movie.models import Movie
from venue.models import Venue

class Repertoire(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    venue = models.ForeignKey(Venue, on_delete=models.CASCADE)
    showtime = models.DateTimeField()
