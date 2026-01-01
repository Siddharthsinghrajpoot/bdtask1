// src/index.js

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import eventsRouter from "./routes/events.js";
// DB connection module

// Load environment variables from .env
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Test route
app.use("/api/v3/app", eventsRouter);

// Port from .env or fallback
const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
  });
