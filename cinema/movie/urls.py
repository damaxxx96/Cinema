from django.urls import path
from . import views

urlpatterns = [
    
    path("create/", views.create_movie, name="create"),
    path("all_movies", views.all_movies, name="movies"),
    path('delete', views.delete_movie, name="delete_movie"),
    
    ]

   
