import express from "express";
import bodyParser from "body-parser";
import connectDB from "./database/connectDB.js";
import queryEmbedding from "./routes/queryEmbedding.js";
import path from "path";
import cors from "cors";
import cron from "node-cron";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 4000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Use the API routes
app.use("/api", queryEmbedding);

// Deployment
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}

// Ping route to keep the server alive
app.get("/ping", (req, res) => {
  res.send("Server is alive");
});

// Schedule a cron job to run every 15 minutes
cron.schedule("*/15 * * * *", async () => {
  try {
    const response = await axios.get("https://v9replica.onrender.com/ping");
    console.log("Ping response:", response.data);
  } catch (error) {
    console.error("Error pinging server:", error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
