import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import ForecastChart from '../components/ForecastChart';
import SavedCities from '../components/SavedCities';
import NearbyCities from '../components/NearbyCities';
import { getWeatherTheme } from '../utils/weatherTheme';

export default function Dashboard() {
  const [weatherData, setWeatherData] = useState(null);
  const [savedCities, setSavedCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [justSaved, setJustSaved] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchSavedCities();
  }, []);

  const fetchSavedCities = async () => {
    try {
      const res = await api.get('/weather/saved-cities/');
      setSavedCities(res.data);
    } catch (err) {
      console.error('Saved cities fetch fail hui', err);
    }
  };

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/weather/search/?city=${encodeURIComponent(cityName)}`);
      setWeatherData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCity = async () => {
    if (!weatherData) return;
    try {
      await api.post('/weather/saved-cities/', {
        city_name: weatherData.location.city_name,
        country: weatherData.location.country,
        latitude: weatherData.location.latitude,
        longitude: weatherData.location.longitude,
      });
      fetchSavedCities();
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1500);
    } catch (err) {
      console.error('City save nahi hui', err);
    }
  };

  const handleDeleteCity = async (id) => {
    try {
      await api.delete(`/weather/saved-cities/${id}/`);
      fetchSavedCities();
    } catch (err) {
      console.error('City delete nahi hui', err);
    }
  };

  const theme = weatherData
    ? getWeatherTheme(weatherData.weather.description, weatherData.weather.icon, weatherData.weather.temperature)
    : null;

  return (
    <div
      className="dashboard"
      style={theme ? { background: theme.gradient, backgroundAttachment: 'fixed' } : {}}
    >
      <div className="dashboard-tint">
        <header className="dashboard-header">
          <h1>🌤️ WeatherScope</h1>
          <div>
            <span>Hi, {user?.username}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </header>

        <div className="dashboard-body">
          <aside className="sidebar">
            <SavedCities
              cities={savedCities}
              onSelect={handleSearch}
              onDelete={handleDeleteCity}
            />
          </aside>

          <main className="main-content">
            <SearchBar onSearch={handleSearch} />

            {loading && (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Searching weather data...</p>
              </div>
            )}

            {error && <p className="error-banner">⚠️ {error}</p>}

            {weatherData && !loading && (
              <>
                <WeatherCard
                  location={weatherData.location}
                  weather={weatherData.weather}
                  imageUrl={weatherData.image_url}
                />
                <button
                  onClick={handleSaveCity}
                  className={`save-btn ${justSaved ? 'saved' : ''}`}
                >
                  {justSaved ? '✓ Saved!' : '⭐ Save this city'}
                </button>
                <NearbyCities
                  country={weatherData.location.country}
                  currentCity={weatherData.location.city_name}
                  onSelect={handleSearch}
                />
                <ForecastChart forecast={weatherData.forecast} />
              </>
            )}

            {!weatherData && !loading && !error && (
              <div className="empty-state">
                <span className="empty-emoji">🌍</span>
                <p>Search a city above to get started!</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}