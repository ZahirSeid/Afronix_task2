import os
from dotenv import load_dotenv
import requests

load_dotenv()
class OpenWeatherMapAPI:
    def __init__(self):
        self.api_key = os.getenv("OPENWEATHERMAP_API_KEY")
        self.base_url = "http://api.openweathermap.org/data/2.5/"

    def get_current_weather_by_coordinates(self, lat, lon):
        endpoint = "weather"
        params = {
            "lat": lat,
            "lon": lon,
            "appid": self.api_key,
            "units": "metric"  # Use metric units for temperature, wind speed, etc.
        }
        url = f"{self.base_url}{endpoint}"
        response = requests.get(url, params=params)
        data = response.json()
        return data

    def get_current_weather_by_city_name(self, city_name):
        endpoint = "weather"
        params = {
            "q": city_name,
            "appid": self.api_key,
            "units": "metric"
        }
        url = f"{self.base_url}{endpoint}"
        response = requests.get(url, params=params)
        data = response.json()
        return data

    def get_current_weather_by_zip_code(self, zip_code, country_code):
        endpoint = "weather"
        params = {
            "zip": f"{zip_code},{country_code}",
            "appid": self.api_key,
            "units": "metric"
        }
        url = f"{self.base_url}{endpoint}"
        response = requests.get(url, params=params)
        data = response.json()
        return data
