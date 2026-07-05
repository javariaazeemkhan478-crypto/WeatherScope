export default function WeatherEffects({ themeName }) {
  if (themeName === 'rainy') {
    return (
      <div className="rain-container">
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} className="rain-drop" style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
      </div>
    );
  }

  if (themeName === 'clear-day') {
    return (
      <div className="sun-rays-container">
        <div className="sun-glow"></div>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="sun-ray"
            style={{ transform: `rotate(${i * 45}deg)` }}
          />
        ))}
      </div>
    );
  }

  if (themeName === 'thunderstorm') {
    return (
      <div className="storm-container">
        {Array.from({ length: 25 }).map((_, i) => (
          <span key={i} className="rain-drop storm-drop" style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${0.3 + Math.random() * 0.3}s`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
        <div className="lightning-flash"></div>
      </div>
    );
  }

  if (themeName === 'cloudy' || themeName === 'misty') {
    return (
      <div className="wind-container">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="wind-line" style={{
            top: `${10 + i * 15}%`,
            animationDuration: `${3 + Math.random() * 2}s`,
            animationDelay: `${Math.random() * 2}s`,
          }} />
        ))}
      </div>
    );
  }

  return null;
}