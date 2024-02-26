# your_app/urls.py

from django.urls import path
from .views import all_repertoires, create_repertoire, delete_repertoire, get_repertoire_by_venue, movie_detail

urlpatterns = [
    path('get_repertoire_by_venue/<str:venue_identifier>/', get_repertoire_by_venue, name='get_repertoire_by_venue'),
    path('movies/<str:movie_id>/', movie_detail, name='movie_detail'),
    path('', create_repertoire, name="create_repertoire"),
    path('delete', delete_repertoire, name="delete_repertoire"),
    path('all_repertoires/', all_repertoires, name='all_repertoires')
]
