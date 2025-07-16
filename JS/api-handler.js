// api-handler.js
const USE_MOCK = false; // Set to false to use real API
const API_KEY = '4bac8fd9bc494213b5563439240705';
const MAX_ID = 973187;

const mockData = {
  location: {
    name: "Cordoba Cordoba Cordoba",
    country: "Argentina",
    localtime: "2025-04-30 14:00"
  },
  current: {
    temp_c: 23,
    temp_f: 73.4,
    is_day: 1,
    condition: {
      code: 1003,
      text: "Partly Cloudy"
    }
  }
};

export async function fetchWeatherData() {
  if (USE_MOCK) {
    return parseWeatherData(mockData);
  }

  const MAX_ATTEMPTS = 10;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const randomId = Math.floor(Math.random() * MAX_ID) + 1;
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=id:${randomId}`);

    if (!response.ok) continue;

    const data = await response.json();
    if (data.location.name.toLowerCase() === 'idlib') {
      console.log('got idlib mate');
      continue;
    }
    
    
    return parseWeatherData(data);
  }

  throw new Error('Unable to fetch valid weather data after multiple attempts.');
}

function parseWeatherData(data) {
  return {
    city: data.location.name,
    country: data.location.country,
    localtime: data.location.localtime,
    temperatureC: Math.round(data.current.temp_c),
    temperatureF: Math.round(data.current.temp_f),
    conditionCode: data.current.condition.code,
    conditionText: data.current.condition.text,
    isDay: data.current.is_day,
    latitude: data.location.lat
  };
}