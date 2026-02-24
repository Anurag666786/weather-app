const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// ✅ CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:5173", // local dev (Vite default)
      "https://weather-7jo18igzs-arya-tactical-technologies-projects.vercel.app" // your Vercel frontend
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());

connectDB();

app.use("/api/weather", require("./routes/weatherRoutes"));

app.get("/", (req, res) => {
  res.send("Weather API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});