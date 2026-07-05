export default function SavedCities({ cities, onSelect, onDelete }) {
  return (
    <div className="saved-cities">
      <h3>⭐ Saved Cities</h3>
      <p className="double-click-hint">Double-click to remove</p>
      {cities.length === 0 && (
        <p className="empty-text">Koi city save nahi ki abhi tak.</p>
      )}
      {cities.map((city) => (
        <div
          key={city.id}
          className="saved-city-item"
          onClick={() => onSelect(city.city_name)}
          onDoubleClick={() => onDelete(city.id)}
          title="Single click: search | Double click: remove"
        >
          <span>📍 {city.city_name}</span>
        </div>
      ))}
    </div>
  );
}