from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import SavedCity, WeatherLog
from .serializers import SavedCitySerializer, WeatherLogSerializer
from .services import (
    geocode_city, get_current_weather, get_forecast,
    get_city_image, WeatherServiceError
)


class SearchWeatherView(APIView):
    """Main search endpoint: city name leke poora weather data deta hai"""
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        city_name = request.query_params.get('city')
        if not city_name:
            return Response({"error": "city query parameter zaroori hai."}, status=400)

        try:
            location = geocode_city(city_name)
            weather = get_current_weather(location['latitude'], location['longitude'])
            forecast = get_forecast(location['latitude'], location['longitude'])
            image_url = get_city_image(location['city_name'])
        except WeatherServiceError as e:
            return Response({"error": str(e)}, status=503)

        # Search history mein save karo
        WeatherLog.objects.create(
            user=request.user,
            city_name=location['city_name'],
            temperature=weather['temperature'],
            description=weather['description']
        )

        return Response({
            "location": location,
            "weather": weather,
            "forecast": forecast,
            "image_url": image_url,
        })


class SavedCityListCreateView(generics.ListCreateAPIView):
    """Saved cities ki list dikhata hai aur nayi city save karta hai"""
    serializer_class = SavedCitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedCity.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SavedCityDeleteView(generics.DestroyAPIView):
    """Saved city remove karta hai"""
    serializer_class = SavedCitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavedCity.objects.filter(user=self.request.user)


class WeatherHistoryView(generics.ListAPIView):
    """User ki search history dikhata hai"""
    serializer_class = WeatherLogSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return WeatherLog.objects.filter(user=self.request.user)[:20]