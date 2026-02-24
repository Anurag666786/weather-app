import { motion } from "framer-motion";

function Forecast({ forecast }) {
  if (!forecast) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-10 w-full max-w-4xl"
    >
      <h3 className="text-white text-2xl font-semibold mb-6 text-center">
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 text-center text-white hover:-translate-y-2 transition duration-300"
          >
            <p className="font-medium">{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt=""
              className="mx-auto"
            />
            <p className="font-bold text-lg">
              {Math.round(day.temp)}°C
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default Forecast;