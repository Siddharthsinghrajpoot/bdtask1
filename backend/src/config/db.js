// db.js - MongoDB connection

import { MongoClient } from "mongodb";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// MongoClient instance (singleton)
let client;

/**
 * Connect to MongoDB
 * Returns MongoClient instance
 */
export async function connectDB() {
  try {
    // Check if client already exists
    if (!client) {
      client = new MongoClient(MONGO_URL);
      await client.connect(); // connect to DB
      console.log("✅ MongoDB connected successfully");
    }
    return client; // return client for reuse
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // stop server if DB not connected
  }
}

/**
 * Get database by name
 * @param {string} dbName
 * @returns MongoDB Database instance
 */
export function getDB(dbName) {
  if (!client) {
    throw new Error("MongoDB client not initialized. Call connectDB() first.");
  }
  return client.db(dbName);
}
