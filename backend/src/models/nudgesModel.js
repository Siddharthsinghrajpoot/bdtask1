// src/models/nudgesModel.js
import { getDB, connectDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const DB_NAME = "myAppDB";        // Same database as events
const COLLECTION_NAME = "nudges";  // Separate collection

// Helper: get collection
async function getCollection() {
  await connectDB();
  return getDB(DB_NAME).collection(COLLECTION_NAME);
}

// Validate payload
function validateNudgeData(data) {
  const requiredFields = ["eventId", "title", "schedule", "description"];
  for (let field of requiredFields) {
    if (!data[field]) throw new Error(`Field '${field}' is required`);
  }
  return true;
}

// Create Nudge
export async function createNudge(data) {
  validateNudgeData(data);
  const collection = await getCollection();
  const result = await collection.insertOne(data);
  return result.insertedId;
}

// Get all Nudges with pagination
export async function getNudges(limit = 5, page = 1) {
  const collection = await getCollection();
  const skip = (page - 1) * limit;
  return collection.find().sort({ _id: -1 }).skip(skip).limit(limit).toArray();
}

// Get single Nudge by ID
export async function getNudgeById(id) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid ID");
  const collection = await getCollection();
  return collection.findOne({ _id: new ObjectId(id) });
}

// Update Nudge
export async function updateNudge(id, data) {
  validateNudgeData(data);
  if (!ObjectId.isValid(id)) throw new Error("Invalid ID");
  const collection = await getCollection();
  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  return result.modifiedCount;
}

// Delete Nudge
export async function deleteNudge(id) {
  if (!ObjectId.isValid(id)) throw new Error("Invalid ID");
  const collection = await getCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}
