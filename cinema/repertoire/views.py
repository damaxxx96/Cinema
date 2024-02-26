# views.py
import json
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from .models import Repertoire
from venue.models import Venue
from django.core.serializers import serialize

def get_repertoire_by_venue(request, venue_identifier):
    try:
        # Check if the identifier is a numeric value (venue ID)
        if venue_identifier.isdigit():
            venue = get_object_or_404(Venue, id=venue_identifier)
        else:
            # If not numeric, assume it's the name of the venue
            venue = get_object_or_404(Venue, name=venue_identifier)

        # Retrieve repertoire entries for the given venue
        repertoire_entries = Repertoire.objects.filter(venue=venue)

        # Create a list of dictionaries representing the repertoire entries
        repertoire_list = []
        for entry in repertoire_entries:
            repertoire_list.append({
                'movie_id': entry.movie.id,
                'movie_name': entry.movie.name,
                'venue_name': entry.venue.name,
                'showtime': entry.showtime.strftime('%Y-%m-%d %H:%M:%S'),  # Convert to string
            })

        # Return the repertoire list in JSON format
        return JsonResponse({"repertoire":repertoire_list}, safe=False)
    
    except Venue.DoesNotExist:
        return JsonResponse({'error': 'Venue not found.'}, status=404)
    
    except Repertoire.DoesNotExist:
        return JsonResponse({'error': 'No repertoire found for the given venue.'}, status=404)

from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Movie

def movie_detail(request, movie_id):
    # Retrieve the movie object or return a 404 error if not found
    movie = get_object_or_404(Movie, pk=movie_id)

    # Prepare data for the JSON response
    movie_data = {
       
        'name': movie.name,
        'description': movie.description,
        'genre': movie.genre,
        'image': movie.image.url,
    }

    # Return the movie data in JSON format
    return JsonResponse(movie_data)

def create_repertoire(request:HttpRequest):

    if request.method == "POST":
        try:
            data = json.loads(request.body)
            movie_id = data["movie"]
            movie = Movie.objects.get(pk=movie_id)
            venue_id = data["venue"]
            venue= Venue.objects.get(pk=venue_id)
            showtime=data["showtime"]
            repertoire=Repertoire(movie=movie,venue=venue,showtime=showtime)
            repertoire.save()


        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

        return HttpResponse(status=201)
    else:
        return HttpResponse(status=405)
def delete_repertoire(request: HttpRequest):
    if request.method == "DELETE":
        try:
            data = json.loads(request.body)
            repertoire_id = data['repertoire']
            repertoire = Repertoire.objects.get(pk=repertoire_id)
            repertoire.delete()
            return HttpResponse(status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return HttpResponse(status=405)
    
from django.http import JsonResponse

def all_repertoires(request):
    repertoires = Repertoire.objects.all()
    
    # Create a list of dictionaries representing each repertoire
    repertoires_list = [
        {
            "id": repertoire.id,
            "movie": repertoire.movie.name,
            "venue": repertoire.venue.name,
            "showtime": repertoire.showtime.strftime('%Y-%m-%d %H:%M:%S')  # Adjust the format as needed
        }
        for repertoire in repertoires
    ]

    return JsonResponse(repertoires_list, safe=False)
