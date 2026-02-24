const axios = require("axios");
const cache = require("../utils/cache");

const apiKey = process.env.OPENWEATHER_API_KEY;

/* =============================
   CURRENT WEATHER
============================= */

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
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    cache.set(cacheKey, formattedData, 600);

    res.json(formattedData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: "City not found" });
    }

    res.status(500).json({ message: "Server Error" });
  }
};

/* =============================
   5 DAY FORECAST
============================= */

const getForecastByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const cacheKey = `forecast_${city.toLowerCase()}`;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const forecastList = response.data.list;

    const dailyForecast = forecastList
      .filter((_, index) => index % 8 === 0)
      .slice(0, 5)
      .map((item) => ({
        date: new Date(item.dt * 1000).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        temp: item.main.temp,
        icon: item.weather[0].icon,
        rainChance: Math.round(item.pop * 100), // 🌧 Added
      }));

    cache.set(cacheKey, dailyForecast, 600);

    res.json(dailyForecast);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getWeatherByCity, getForecastByCity };