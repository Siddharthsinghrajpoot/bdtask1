// routes/events.js
import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from "../models/eventsmodel.js";

const router = express.Router();

// -------------------------------
// POST /api/v3/app/events
// Create a new event


// -------------------------------
router.post("/events", async (req, res) => {
  try {
    const eventId = await createEvent(req.body);
    res.status(201).json({ message: "Event created", eventId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------------
// GET /api/v3/app/events
// GET single event by ID: /events?id=:event_id
// GET latest events: /events?type=latest&limit=5&page=1
// -------------------------------
router.get("/events", async (req, res) => {
  try {
    const { id, type, limit = 5, page = 1 } = req.query;

    if (id) {
      // Fetch single event by ID
      const event = await getEventById(id);
      if (!event) return res.status(404).json({ message: "Event not found" });
      return res.json(event);
    }

    if (type === "latest") {
      // Fetch latest events with pagination
      const events = await getEvents(Number(limit), Number(page));
      return res.json(events);
    }

    // Default: fetch all events (optional)
    const events = await getEvents();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------
// PUT /api/v3/app/events/:id
// Update event by ID
// -------------------------------
router.put("/events/:id", async (req, res) => {
  try {
    const modifiedCount = await updateEvent(req.params.id, req.body);
    if (modifiedCount === 0) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event updated", modifiedCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// -------------------------------
// DELETE /api/v3/app/events/:id
// Delete event by ID
// -------------------------------
router.delete("/events/:id", async (req, res) => {
  try {
    const deletedCount = await deleteEvent(req.params.id);
    if (deletedCount === 0) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted", deletedCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
