const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

/*
========================================
  ✅ CORS FIX
  Allow all origins (safe for public API)
========================================
*/
app.use(cors());

app.use(express.json());

// Routes
app.use("/api/weather", require("./routes/weatherRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.send("Weather API is running...");
});

// Important for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});