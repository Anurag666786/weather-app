const axios = require("axios");
const cache = require("../utils/cache");

const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const cacheKey = `weather_${city.toLowerCase()}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const data = response.data;

    const formattedData = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      condition: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    cache.set(cacheKey, formattedData);

    res.json(formattedData);

  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getWeatherByCity };