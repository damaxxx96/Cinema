
from django.db import models

class Venue(models.Model):
    name = models.CharField(max_length=255)
    