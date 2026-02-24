const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchWeather = async (city) => {
  const response = await fetch(
    `${BASE_URL}?city=${encodeURIComponent(city)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "City not found");
  }

  return data;
};

export const fetchForecast = async (city) => {
  const response = await fetch(
    `${BASE_URL}/forecast?city=${encodeURIComponent(city)}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch forecast");
  }

  return data;
};