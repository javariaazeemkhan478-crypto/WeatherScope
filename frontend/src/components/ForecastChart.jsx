import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00');
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return { weekday, day, month, year, full: `${weekday}, ${day} ${month} ${year}` };
}

export default function ForecastChart({ forecast }) {
  const chartData = forecast.map((day) => {
    const { weekday, day: d, month } = formatDate(day.date);
    return {
      label: `${weekday}\n${d} ${month}`,
      temp: Math.round(day.temperature),
    };
  });

  return (
    <div className="forecast-chart">
      <h3>📅 7-Day Forecast</h3>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="label"
            stroke="rgba(255,255,255,0.7)"
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.8)' }}
          />
          <YAxis
            stroke="rgba(255,255,255,0.7)"
            tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.8)' }}
          />
          <Tooltip
            contentStyle={{
              background: 'rgba(15, 23, 42, 0.95)',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '0.85rem'
            }}
            formatter={(value) => [`${value}°C`, 'Temp']}
          />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#FFD93D"
            strokeWidth={3}
            dot={{ fill: '#FF6B35', r: 5 }}
            activeDot={{ r: 7, fill: '#FFD93D' }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="forecast-cards">
        {forecast.map((day, idx) => {
          const { weekday, day: d, month, year } = formatDate(day.date);
          return (
            <div key={idx} className="forecast-day">
              <span className="forecast-weekday">{weekday}</span>
              <span className="forecast-date">{d} {month}</span>
              <span className="forecast-year">{year}</span>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
              />
              <span className="forecast-temp">{Math.round(day.temperature)}°C</span>
              <span className="forecast-desc">{day.description}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}