import { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import HourlyForecast from "../components/HourlyForecast"; // ✅ ADDED
import LoadingSkeleton from "../components/LoadingSkeleton";
import { fetchWeather, fetchForecast } from "../services/api";

function Home() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);
      setWeather(null);
      setForecast(null);

      const weatherData = await fetchWeather(city);
      const forecastData = await fetchForecast(city);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col items-center px-4 py-12">
        <SearchBar onSearch={handleSearch} />

        {loading && <LoadingSkeleton />}

        {!loading && error && (
          <p className="text-red-400 mt-6 text-lg font-medium">
            {error}
          </p>
        )}

        {!loading && weather && <WeatherCard data={weather} />}

        {/* ✅ HOURLY FORECAST ADDED HERE */}
        {!loading && weather?.hourly && (
          <HourlyForecast hourly={weather.hourly} />
        )}

        {!loading && forecast && <Forecast forecast={forecast} />}
      </div>
    </>
  );
}

export default Home;