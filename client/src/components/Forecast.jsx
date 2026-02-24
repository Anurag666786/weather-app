import { motion } from "framer-motion";
import {
  WiDaySunny,
  WiRain,
  WiCloud,
  WiSnow,
  WiFog,
  WiThunderstorm,
} from "react-icons/wi";

function getWeatherIcon(description) {
  const desc = description.toLowerCase();

  if (desc.includes("clear")) return <WiDaySunny size={60} className="text-yellow-400 mx-auto" />;
  if (desc.includes("rain")) return <WiRain size={60} className="text-blue-400 mx-auto" />;
  if (desc.includes("cloud")) return <WiCloud size={60} className="text-gray-300 mx-auto" />;
  if (desc.includes("snow")) return <WiSnow size={60} className="text-cyan-300 mx-auto" />;
  if (desc.includes("thunder")) return <WiThunderstorm size={60} className="text-purple-400 mx-auto" />;
  if (desc.includes("haze") || desc.includes("mist") || desc.includes("fog"))
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

            {getWeatherIcon(day.description)}

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