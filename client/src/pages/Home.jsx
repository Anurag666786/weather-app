import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { fetchWeather } from "../services/api";

function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // ✅ added error state

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError(null);        // ✅ clear old errors
      setWeather(null);      // ✅ clear old weather

      const data = await fetchWeather(city);

      setWeather(data);
      setLoading(false);

    } catch (err) {
      setWeather(null);
      setError(err.message);  // ✅ store error message
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12">

      <h1 className="text-white text-4xl font-bold mb-10 tracking-tight">
        Global Weather
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <LoadingSkeleton />}

      {/* ✅ Show error message */}
      {!loading && error && (
        <p className="text-red-400 mt-6 text-lg font-medium">
          {error}
        </p>
      )}

      {!loading && weather && <WeatherCard data={weather} />}

    </div>
  );
}

export default Home;