from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .api import OpenWeatherMapAPI

class CurrentWeatherAPIView(APIView):
    def post(self, request):
        city_name = request.data.get('city_name')
        zip_code = request.data.get('zip_code')
        country_code = request.data.get('country_code')
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')

        # Check if either city name, ZIP code, or coordinates are provided
        if not any([city_name, zip_code, (latitude and longitude)]):
            return Response({'error': 'City name, ZIP code, or coordinates must be provided.'}, status=status.HTTP_400_BAD_REQUEST)

        # If both city name and ZIP code are provided, return an error
        if city_name and zip_code:
            return Response({'error': 'Provide either city name or ZIP code, not both.'}, status=status.HTTP_400_BAD_REQUEST)

        # If only ZIP code is provided, fetch weather data by ZIP code
        if zip_code:
            weather_api = OpenWeatherMapAPI()
            weather_data = weather_api.get_current_weather_by_zip_code(zip_code, country_code)
            if 'cod' in weather_data and weather_data['cod'] == '404':
                return Response({'error': 'City not found'}, status=status.HTTP_404_NOT_FOUND)
            return Response(weather_data)

        # If only city name is provided, fetch weather data by city name
        if city_name:
            weather_api = OpenWeatherMapAPI()
            weather_data = weather_api.get_current_weather_by_city_name(city_name)
            if 'cod' in weather_data and weather_data['cod'] == '404':
                return Response({'error': 'City not found'}, status=status.HTTP_404_NOT_FOUND)
            return Response(weather_data)

        # If latitude and longitude are provided, use them to fetch weather data
        if latitude and longitude:
            weather_api = OpenWeatherMapAPI()
            weather_data = weather_api.get_current_weather_by_coordinates(latitude, longitude)
            return Response(weather_data)

        # If latitude and longitude are not provided, return an error response
        return Response({'error': 'Latitude and longitude must be provided or available.'}, status=status.HTTP_400_BAD_REQUEST)
