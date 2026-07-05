from django.db import models
from django.contrib.auth.models import User


class SavedCity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_cities')
    city_name = models.CharField(max_length=100)
    country = models.CharField(max_length=100, blank=True)
    latitude = models.FloatField()
    longitude = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'city_name')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.city_name} ({self.user.username})"


class WeatherLog(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='weather_logs')
    city_name = models.CharField(max_length=100)
    temperature = models.FloatField()
    description = models.CharField(max_length=200)
    searched_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-searched_at']

    def __str__(self):
        return f"{self.city_name} - {self.temperature}°C"