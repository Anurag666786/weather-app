const express = require("express");
const router = express.Router();
const {
  getWeatherByCity,
  getForecastByCity,
} = require("../controllers/weatherController");

router.get("/", getWeatherByCity);
router.get("/forecast", getForecastByCity);

module.exports = router;