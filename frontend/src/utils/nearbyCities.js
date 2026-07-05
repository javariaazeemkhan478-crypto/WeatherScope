export const POPULAR_CITIES_BY_COUNTRY = {
  Pakistan: ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan', 'Peshawar'],
  India: ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami', 'Seattle'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Edinburgh'],
  'United Arab Emirates': ['Dubai', 'Abu Dhabi', 'Sharjah'],
  'Saudi Arabia': ['Riyadh', 'Jeddah', 'Mecca', 'Medina'],
  Canada: ['Toronto', 'Vancouver', 'Montreal', 'Calgary'],
  Australia: ['Sydney', 'Melbourne', 'Brisbane', 'Perth'],
  China: ['Beijing', 'Shanghai', 'Shenzhen', 'Guangzhou'],
  Japan: ['Tokyo', 'Osaka', 'Kyoto', 'Yokohama'],
  Turkey: ['Istanbul', 'Ankara', 'Izmir'],
  Germany: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'],
  France: ['Paris', 'Marseille', 'Lyon'],
  'South Korea': ['Seoul', 'Busan', 'Incheon'],
};

export function getNearbyCities(country, currentCity) {
  const list = POPULAR_CITIES_BY_COUNTRY[country];
  if (!list) return [];
  return list
    .filter((c) => c.toLowerCase() !== currentCity.toLowerCase())
    .slice(0, 4);
}