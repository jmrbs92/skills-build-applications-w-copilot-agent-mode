"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
import os

def get_api_base_url():
    """Get the API base URL based on environment."""
    codespace_name = os.environ.get('CODESPACE_NAME')
    if codespace_name:
        return f"https://{codespace_name}-8000.app.github.dev/api"
    else:
        return "http://localhost:8000/api"

def api_root(request):
    """API root endpoint that returns available endpoints."""
    base_url = get_api_base_url()
    endpoints = {
        "api": base_url,
        "activities": f"{base_url}/activities/",
        "users": f"{base_url}/users/",
        "teams": f"{base_url}/teams/",
        "leaderboard": f"{base_url}/leaderboard/",
        "workouts": f"{base_url}/workouts/",
    }
    return JsonResponse(endpoints)

def api_component(request, component):
    """Component-specific API endpoint."""
    base_url = get_api_base_url()
    return JsonResponse({
        "component": component,
        "endpoint": f"{base_url}/{component}/",
        "message": f"API endpoint for {component}"
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', api_root, name='root'),
    path('api/', api_root, name='api_root'),
    path('api/<str:component>/', api_component, name='api_component'),
]
