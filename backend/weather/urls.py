from django.urls import path
from .views import (
    SearchWeatherView, SavedCityListCreateView,
    SavedCityDeleteView, WeatherHistoryView
)

urlpatterns = [
    path('search/', SearchWeatherView.as_view(), name='weather-search'),
    path('saved-cities/', SavedCityListCreateView.as_view(), name='saved-cities'),
    path('saved-cities/<int:pk>/', SavedCityDeleteView.as_view(), name='saved-city-delete'),
    path('history/', WeatherHistoryView.as_view(), name='weather-history'),
]