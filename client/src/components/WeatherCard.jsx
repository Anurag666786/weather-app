import { motion } from "framer-motion";

function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-2xl border border-white/20 
                 rounded-3xl p-10 w-full max-w-md 
                 shadow-2xl text-white mt-10
                 hover:-translate-y-3 transition duration-500"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-wide">
          {data.city}, {data.country}
        </h2>

        <motion.img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt=""
          className="mx-auto"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        />

        <p className="text-7xl font-extrabold tracking-tight">
          {Math.round(data.temperature)}°
        </p>

        <p className="capitalize text-gray-300 mt-2">
          {data.description}
        </p>
      </div>

      <div className="flex justify-between mt-8 text-center">
        <div>
          <p className="text-gray-400 text-sm">Humidity</p>
          <p className="text-lg font-semibold">{data.humidity}%</p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">Wind</p>
          <p className="text-lg font-semibold">{data.windSpeed} m/s</p>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard;