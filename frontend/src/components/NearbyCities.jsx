import { getNearbyCities } from '../utils/nearbyCities';

export default function NearbyCities({ country, currentCity, onSelect }) {
  const cities = getNearbyCities(country, currentCity);
  if (cities.length === 0) return null;

  return (
    <div className="nearby-cities">
      <h3>📍Nearby Cities</h3>
      <div className="nearby-cities-chips">
        {cities.map((city) => (
          <button key={city} className="city-chip" onClick={() => onSelect(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}