export function getWeatherTheme(description, icon, temperature) {
  const desc = description.toLowerCase();
  const isNight = icon?.includes('n');

  // Pehle description check karo
  if (desc.includes('thunderstorm')) return THEMES.thunderstorm;
  if (desc.includes('snow')) return THEMES.snow;
  if (desc.includes('rain') || desc.includes('drizzle')) return THEMES.rainy;
  if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return THEMES.misty;

  // Clear ya cloudy ke liye temperature bhi check karo
  if (desc.includes('clear')) {
    if (isNight) return THEMES.clearNight;
    if (temperature <= 15) return THEMES.coldClear;  // Thand + clear sky
    if (temperature <= 25) return THEMES.mildClear;  // Normal + clear
    return THEMES.clearDay;                           // Garmi + clear
  }

  if (desc.includes('cloud')) {
    if (temperature <= 10) return THEMES.coldCloudy;
    return THEMES.cloudy;
  }

  // Default
  if (temperature <= 10) return THEMES.coldCloudy;
  if (isNight) return THEMES.clearNight;
  return THEMES.cloudy;
}

export const THEMES = {
  clearDay: {
    name: 'clear-day',
    gradient: 'linear-gradient(135deg, #FF8C42 0%, #FFD93D 50%, #FFA62B 100%)',
    accent: '#FF6B35',
    emoji: '☀️',
  },
  coldClear: {
    name: 'cold-clear',
    gradient: 'linear-gradient(135deg, #2980B9 0%, #6DD5FA 50%, #FFFFFF 100%)',
    accent: '#6DD5FA',
    emoji: '🌤️',
  },
  mildClear: {
    name: 'mild-clear',
    gradient: 'linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)',
    accent: '#56CCF2',
    emoji: '🌤️',
  },
  clearNight: {
    name: 'clear-night',
    gradient: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)',
    accent: '#7B9FE0',
    emoji: '🌙',
  },
  cloudy: {
    name: 'cloudy',
    gradient: 'linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)',
    accent: '#6C7A93',
    emoji: '☁️',
  },
  coldCloudy: {
    name: 'cold-cloudy',
    gradient: 'linear-gradient(135deg, #304352 0%, #d7d2cc 100%)',
    accent: '#8fa3b1',
    emoji: '🌥️',
  },
  rainy: {
    name: 'rainy',
    gradient: 'linear-gradient(135deg, #1F3B57 0%, #3A6186 50%, #2C5364 100%)',
    accent: '#4FACFE',
    emoji: '🌧️',
  },
  thunderstorm: {
    name: 'thunderstorm',
    gradient: 'linear-gradient(135deg, #232526 0%, #414345 50%, #1a1a2e 100%)',
    accent: '#9D50BB',
    emoji: '⛈️',
  },
  snow: {
    name: 'snow',
    gradient: 'linear-gradient(135deg, #E6DADA 0%, #c9d6ea 50%, #a8c0d8 100%)',
    accent: '#5C7FA3',
    emoji: '❄️',
  },
  misty: {
    name: 'misty',
    gradient: 'linear-gradient(135deg, #BCC5CE 0%, #8796A5 100%)',
    accent: '#6D7E8E',
    emoji: '🌫️',
  },
};

export function getMoodMessage(temp) {
  if (temp >= 40) return { text: "Extreme heat! Stay hydrated and avoid going out", emoji: "🔥" };
  if (temp >= 35) return { text: "Very hot outside! Keep yourself in the shade", emoji: "🕶️" };
  if (temp >= 25) return { text: "Great weather! Perfect time to head outside", emoji: "😎" };
  if (temp >= 15) return { text: "Mild and cool, grab a light jacket!", emoji: "🧥" };
  if (temp >= 5)  return { text: "It's cold out there, warm up with a hot drink!", emoji: "☕" };
  return { text: "Freezing cold! Bundle up and stay warm", emoji: "⛄" };
}