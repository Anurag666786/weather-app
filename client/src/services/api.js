const BASE_URL = "https://weather-app-08x3.onrender.com/api/weather";

export const fetchWeather = async (city) => {
  const response = await fetch(`${BASE_URL}?city=${encodeURIComponent(city)}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "City not found");
  }

  return data;
};