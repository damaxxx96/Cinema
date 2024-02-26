import json
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import render

from movie.models import Movie


def create_movie(request: HttpRequest):
    if request.method == "POST":
        try:
            name = request.POST.get("name")
            description = request.POST.get("description")
            genre = request.POST.get("genre")
            
            image = request.FILES.get("image")

            movie = Movie(name=name, description=description, image=image,genre=genre)
            movie.save()
            

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)
    
def update_movie(request, movie_id):
    try:
        movie= Movie.objects.get(pk=movie_id)
        data = json.loads(request.body)

        if "name" in data:
            movie.name = data["name"]
        if "description" in data:
            movie.description = data["description"]
        if "genre" in data:
            movie.description = data["genre"]    

        movie.save()
       

    except Movie.DoesNotExist:
        return JsonResponse({"error": "Anime not found"}, status=404)

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"message": "Anime updated successfully"}, status=200)

def all_movies(request):
    movies = Movie.objects.all()
    

    movie_list = [
        {
            "id": movie.id,
            "name": movie.name,
            "description": movie.description,
            "genre": movie.genre,
            'image': movie.image.url if movie.image else ""
        }
        for movie in movies
    ]

    return JsonResponse(movie_list, safe=False)

def delete_movie(request: HttpRequest):
    if request.method == "DELETE":
        try:
            data = json.loads(request.body)
            movie_id = data['movie']
            movie = Movie.objects.get(pk=movie_id)
            movie.delete()
            return HttpResponse(status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse(status=405)
    
from django.http import JsonResponse
