from django.urls import path
from .views import CurrentWeatherAPIView

urlpatterns = [
    path('api/current_weather/', CurrentWeatherAPIView.as_view(), name='current_weather_api'),
]
