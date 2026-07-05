import { getWeatherTheme, getMoodMessage } from '../utils/weatherTheme';
import WeatherEffects from './WeatherEffects';

export default function WeatherCard({ location, weather, imageUrl }) {
  const theme = getWeatherTheme(weather.description, weather.icon, weather.temperature);
  const mood = getMoodMessage(weather.temperature);

  return (
    <div className="weather-card" style={{ background: theme.gradient }}>
      {imageUrl && (
        <div className="weather-card-bg" style={{ backgroundImage: `url(${imageUrl})` }} />
      )}
      <WeatherEffects themeName={theme.name} />
      <div className="weather-card-overlay">
        <div className="location-row">
          <h2>{location.city_name}, {location.country}</h2>
          <span className="theme-emoji">{theme.emoji}</span>
        </div>
        <div className="weather-main">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
            alt={weather.description}
            className="weather-icon-large"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span className="temperature">{Math.round(weather.temperature)}°C</span>
        </div>
        <p className="description">{weather.description}</p>
        <div className="mood-banner">
          <span className="mood-emoji">{mood.emoji}</span>
          <span>{mood.text}</span>
        </div>
        <div className="weather-details">
          <div className="detail-pill">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{Math.round(weather.feels_like)}°C</span>
          </div>
          <div className="detail-pill">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weather.humidity}%</span>
          </div>
          <div className="detail-pill">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{weather.wind_speed} m/s</span>
          </div>
        </div>
      </div>
    </div>
  );
}