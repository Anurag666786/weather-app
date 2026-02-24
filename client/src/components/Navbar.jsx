function Navbar({ theme, setTheme }) {
  return (
    <nav className="bg-gray-200 dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
          🌍 Global Weather
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
          >
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
          </button>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            Developed by Anurag
          </p>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;