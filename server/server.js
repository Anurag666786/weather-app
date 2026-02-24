const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// ✅ Proper CORS configuration (Production + Local)
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Local dev
      "https://weather-app-phi-orpin-25.vercel.app", // Current Vercel frontend
    ],
    methods: ["GET"],
  })
);

app.use(express.json());

// Routes
app.use("/api/weather", require("./routes/weatherRoutes"));

// Health check route
app.get("/", (req, res) => {
  res.send("Weather API is running...");
});

// ✅ Important for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});