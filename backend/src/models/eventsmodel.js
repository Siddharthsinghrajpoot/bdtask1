// models/eventsModel.js
import { connectDB, getDB } from "../config/db.js";
import { ObjectId } from "mongodb";

const DB_NAME = "myAppDB";           // Database name
const COLLECTION_NAME = "events";    // Collection name

// Helper: get the collection
async function getCollection() {
  await connectDB();
  return getDB(DB_NAME).collection(COLLECTION_NAME);
}

// Helper: validate event payload (like schema)
function validateEventData(data) {
  const requiredFields = [
    "name",
    "tagline",
    "schedule",
    "description",
    "moderator",
    "category",
    "sub_category",
    "rigor_rank"
  ];

  for (let field of requiredFields) {
    if (!data[field]) {
      throw new Error(`Field '${field}' is required`);
    }
  }

  // files is optional but must be an array if provided
  if (data.files && !Array.isArray(data.files)) {
    throw new Error("Field 'files' must be an array");
  }

  return true;
}

// ✅ Create new event
export async function createEvent(eventData) {
  validateEventData(eventData); // enforce required fields
  const collection = await getCollection();
  const result = await collection.insertOne(eventData);
  return result.insertedId;
}

// ✅ Get single event by ID
export async function getEventById(id) {
  const collection = await getCollection();
  return await collection.findOne({ _id: new ObjectId(id) });
}

// ✅ Get latest events (default 5)
export async function getEvents(limit = 5, page = 1) {
  const collection = await getCollection();
  const skip = (page - 1) * limit;
  return await collection
    .find()
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
}

// ✅ Update event by ID
export async function updateEvent(id, updatedData) {
  validateEventData(updatedData); // optional: enforce schema on update
  const collection = await getCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedData }
  );
  return result.modifiedCount;
}

// ✅ Delete event by ID
export async function deleteEvent(id) {
  const collection = await getCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
}
