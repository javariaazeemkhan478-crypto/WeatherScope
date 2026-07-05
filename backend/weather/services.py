import requests
from django.conf import settings
from django.core.cache import cache


class WeatherServiceError(Exception):
    pass


def geocode_city(city_name):
    cache_key = f"geocode_{city_name.lower()}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    url = "https://api.geoapify.com/v1/geocode/search"
    params = {
        "text": city_name,
        "apiKey": settings.GEOAPIFY_API_KEY,
        "limit": 1
    }

    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
    except requests.RequestException:
        raise WeatherServiceError("Geocoding service unavailable hai abhi.")

    if not data.get("features"):
        raise WeatherServiceError(f"'{city_name}' naam ka koi city nahi mila.")

    feature = data["features"][0]
    result = {
        "city_name": feature["properties"].get("city", city_name),
        "country": feature["properties"].get("country", ""),
        "latitude": feature["properties"]["lat"],
        "longitude": feature["properties"]["lon"],
    }

    cache.set(cache_key, result, timeout=60 * 60 * 24)
    return result


def get_current_weather(lat, lon):
    cache_key = f"weather_{lat}_{lon}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "lat": lat,
        "lon": lon,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric"
    }

    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
    except requests.RequestException:
        raise WeatherServiceError("Weather service unavailable hai abhi.")

    result = {
        "temperature": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "humidity": data["main"]["humidity"],
        "description": data["weather"][0]["description"],
        "icon": data["weather"][0]["icon"],
        "wind_speed": data["wind"]["speed"],
    }

    cache.set(cache_key, result, timeout=60 * 10)
    return result


def get_forecast(lat, lon):
    """OpenWeatherMap free tier max 5 days deta hai (40 slots of 3hr each)"""
    cache_key = f"forecast_{lat}_{lon}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    url = "https://api.openweathermap.org/data/2.5/forecast"
    params = {
        "lat": lat,
        "lon": lon,
        "appid": settings.OPENWEATHER_API_KEY,
        "units": "metric",
        "cnt": 40  # max slots
    }

    try:
        response = requests.get(url, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
    except requests.RequestException:
        raise WeatherServiceError("Forecast service unavailable hai abhi.")

    daily_data = []
    seen_dates = set()

    for item in data["list"]:
        date_str = item["dt_txt"].split(" ")[0]
        time_str = item["dt_txt"].split(" ")[1]

        # Noon (12:00) wala slot prefer karo, warna pehla available
        if date_str not in seen_dates:
            seen_dates.add(date_str)
            daily_data.append({
                "date": date_str,
                "temperature": item["main"]["temp"],
                "temp_min": item["main"]["temp_min"],
                "temp_max": item["main"]["temp_max"],
                "description": item["weather"][0]["description"],
                "icon": item["weather"][0]["icon"],
            })
        elif time_str == "12:00:00":
            # 12:00 wala milne pe update kar do
            for d in daily_data:
                if d["date"] == date_str:
                    d["temperature"] = item["main"]["temp"]
                    d["temp_min"] = item["main"]["temp_min"]
                    d["temp_max"] = item["main"]["temp_max"]
                    d["description"] = item["weather"][0]["description"]
                    d["icon"] = item["weather"][0]["icon"]
                    break

    cache.set(cache_key, daily_data, timeout=60 * 30)
    return daily_data


def get_city_image(city_name):
    cache_key = f"image_{city_name.lower()}"
    cached = cache.get(cache_key)
    if cached:
        return cached

    url = "https://api.unsplash.com/search/photos"
    headers = {"Authorization": f"Client-ID {settings.UNSPLASH_ACCESS_KEY}"}
    params = {"query": f"{city_name} city", "per_page": 1}

    try:
        response = requests.get(url, headers=headers, params=params, timeout=5)
        response.raise_for_status()
        data = response.json()
    except requests.RequestException:
        return None

    if data.get("results"):
        return data["results"][0]["urls"]["regular"]
    return None