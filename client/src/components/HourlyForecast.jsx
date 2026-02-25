import { motion } from "framer-motion";

function HourlyForecast({ hourly }) {
  if (!hourly) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-10 w-full max-w-4xl"
    >
      <h3 className="text-white text-2xl font-semibold mb-6 text-center">
        Hourly Forecast
      </h3>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {hourly.map((hour, index) => (
          <div
            key={index}
            className="min-w-[100px] bg-white/20 backdrop-blur-lg 
                       rounded-xl p-4 text-center text-white"
          >
            <p className="text-sm">{hour.time}</p>
            <p className="font-bold">{Math.round(hour.temp)}°C</p>
            <p className="text-blue-300 text-sm">
              🌧 {hour.rainChance}%
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default HourlyForecast;