import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiRain,
  WiCloud,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

function getWeatherIcon(iconCode = "") {
  if (iconCode.includes("01")) return <WiDaySunny size={60} className="text-yellow-400 mx-auto" />;
  if (iconCode.includes("09") || iconCode.includes("10"))
    return <WiRain size={60} className="text-blue-400 mx-auto" />;
  if (iconCode.includes("02") || iconCode.includes("03") || iconCode.includes("04"))
    return <WiCloud size={60} className="text-gray-300 mx-auto" />;
  if (iconCode.includes("13"))
    return <WiSnow size={60} className="text-cyan-300 mx-auto" />;
  if (iconCode.includes("11"))
    return <WiThunderstorm size={60} className="text-purple-400 mx-auto" />;
  if (iconCode.includes("50"))
    return <WiFog size={60} className="text-gray-400 mx-auto" />;

  return <WiDaySunny size={60} className="text-yellow-400 mx-auto" />;
}

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
            className="bg-white/20 backdrop-blur-lg border border-white/30 
                       rounded-2xl p-4 text-center text-white 
                       hover:-translate-y-2 transition duration-300"
          >
            <p className="font-medium">{day.date}</p>

            {getWeatherIcon(day.icon)}

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