from django.contrib.auth import authenticate, login
from django.http import HttpRequest, JsonResponse
import json







def user_login(request: HttpRequest):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            username = data["username"]
            password = data["password"]

             # Check if the user is already authenticated
            if request.user.is_authenticated:
                return JsonResponse({"message": "User is already logged in"}, status=409)

            # Authenticate user
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                sessionid = request.session.session_key
                return JsonResponse({"token": sessionid}, status=200)
            else:
                return JsonResponse(
                    {"error": "Invalid username or password"}, status=401
                )
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON data"}, status=400)
        except KeyError:
            return JsonResponse({"error": "Missing required fields"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)
# Create your views here.
