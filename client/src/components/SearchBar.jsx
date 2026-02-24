import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-md gap-3"
    >
      <input
        type="text"
        placeholder="Search city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 px-5 py-3 rounded-2xl 
                   bg-white/70 dark:bg-white/10 backdrop-blur-lg
                   border border-white/30
                   text-gray-800 dark:text-white 
                   placeholder-gray-500 dark:placeholder-gray-400
                   focus:outline-none focus:ring-2 
                   focus:ring-blue-500 transition"
      />

      <button
        type="submit"
        className="px-6 py-3 rounded-2xl
                   bg-blue-600 hover:bg-blue-700
                   text-white font-semibold
                   transition duration-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;