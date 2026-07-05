from rest_framework import serializers
from .models import SavedCity, WeatherLog


class SavedCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedCity
        fields = ['id', 'city_name', 'country', 'latitude', 'longitude', 'created_at']
        read_only_fields = ['id', 'created_at']


class WeatherLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherLog
        fields = ['id', 'city_name', 'temperature', 'description', 'searched_at']
        read_only_fields = ['id', 'searched_at']