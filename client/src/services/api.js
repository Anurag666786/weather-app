const BASE_URL = "/api/weather";  // ✅ using proxy

export const fetchWeather = async (city) => {
  const response = await fetch(`${BASE_URL}?city=${encodeURIComponent(city)}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "City not found");
  }

  return data;
};