import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiRain,
  WiCloud,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

function getWeatherIcon(description = "") {
  const desc = description.toLowerCase();

  if (desc.includes("clear")) return <WiDaySunny size={100} className="text-yellow-400 mx-auto" />;
  if (desc.includes("rain")) return <WiRain size={100} className="text-blue-400 mx-auto" />;
  if (desc.includes("cloud")) return <WiCloud size={100} className="text-gray-400 mx-auto" />;
  if (desc.includes("snow")) return <WiSnow size={100} className="text-cyan-400 mx-auto" />;
  if (desc.includes("thunder")) return <WiThunderstorm size={100} className="text-purple-400 mx-auto" />;
  if (desc.includes("haze") || desc.includes("mist") || desc.includes("fog"))
    return <WiFog size={100} className="text-gray-500 mx-auto" />;

  return <WiDaySunny size={100} className="text-yellow-400 mx-auto" />;
}

function WeatherCard({ data }) {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/70 dark:bg-white/10 backdrop-blur-2xl 
                 border border-white/30 
                 rounded-3xl p-10 w-full max-w-md 
                 shadow-2xl 
                 text-gray-800 dark:text-white 
                 mt-10
                 hover:-translate-y-3 transition duration-500"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-wide">
          {data.city}, {data.country}
        </h2>

        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4 }}
        >
          {getWeatherIcon(data.description || "")}
        </motion.div>

        <p className="text-7xl font-extrabold tracking-tight">
          {Math.round(data.temperature)}°
        </p>

        <p className="capitalize text-gray-600 dark:text-gray-200 mt-2">
          {data.description}
        </p>
      </div>

      <div className="flex justify-between mt-8 text-center">
        <div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Humidity</p>
          <p className="text-lg font-semibold">{data.humidity}%</p>
        </div>

        <div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Wind</p>
          <p className="text-lg font-semibold">{data.windSpeed} m/s</p>
        </div>
      </div>
    </motion.div>
  );
}

export default WeatherCard;