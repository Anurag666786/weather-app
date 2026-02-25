const axios = require("axios");
const cache = require("../utils/cache");

const apiKey = process.env.OPENWEATHER_API_KEY;

/* =============================
   CURRENT WEATHER + HOURLY + RAIN
   (FREE TIER SAFE)
============================= */

const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const cacheKey = `weather_${city.toLowerCase()}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return res.json(cachedData);

    // 1️⃣ Current Weather
    const weatherResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    // 2️⃣ Forecast (for hourly + rain chance)
    const forecastResponse = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const weatherData = weatherResponse.data;
    const forecastList = forecastResponse.data.list;

    const formattedData = {
      city: weatherData.name,
      country: weatherData.sys.country,
      temperature: weatherData.main.temp,
      feelsLike: weatherData.main.feels_like,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      description: weatherData.weather[0].description,
      icon: weatherData.weather[0].icon,

      // 🌧 Rain chance (next 3 hours from forecast)
      rainChance: forecastList[0]?.pop
        ? Math.round(forecastList[0].pop * 100)
        : 0,

      // 🕒 Hourly forecast (next 8 entries = 24 hours, 3hr interval)
      hourly: forecastList.slice(0, 8).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
        }),
        temp: item.main.temp,
        icon: item.weather[0].icon,
        rainChance: Math.round(item.pop * 100),
      })),
    };

    cache.set(cacheKey, formattedData, 600);

    res.json(formattedData);
  } catch (error) {
    console.error(error.response?.data || error.message);
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
    if (cachedData) return res.json(cachedData);

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
        rainChance: Math.round(item.pop * 100),
      }));

    cache.set(cacheKey, dailyForecast, 600);

    res.json(dailyForecast);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getWeatherByCity, getForecastByCity };