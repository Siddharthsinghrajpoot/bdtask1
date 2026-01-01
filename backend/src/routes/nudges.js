// src/routes/nudges.js
import express from "express";
import {
  createNudge,
  getNudges,
  getNudgeById,
  updateNudge,
  deleteNudge,
} from "../models/nudgesModel.js";

const router = express.Router();

// POST /nudges - Create a nudge
router.post("/nudges", async (req, res) => {
  try {
    const id = await createNudge(req.body);
    res.json({ message: "Nudge created", id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /nudges - Get all nudges or single by ?id=
router.get("/nudges", async (req, res) => {
  try {
    const { id, limit = 5, page = 1 } = req.query;
    if (id) {
      const nudge = await getNudgeById(id);
      if (!nudge) return res.status(404).json({ message: "Nudge not found" });
      return res.json(nudge);
    }
    const nudges = await getNudges(Number(limit), Number(page));
    res.json(nudges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /nudges/:id - Update nudge
router.put("/nudges/:id", async (req, res) => {
  try {
    const modifiedCount = await updateNudge(req.params.id, req.body);
    if (modifiedCount === 0) return res.status(404).json({ message: "Nudge not found" });
    res.json({ message: "Nudge updated", modifiedCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /nudges/:id - Delete nudge
router.delete("/nudges/:id", async (req, res) => {
  try {
    const deletedCount = await deleteNudge(req.params.id);
    if (deletedCount === 0) return res.status(404).json({ message: "Nudge not found" });
    res.json({ message: "Nudge deleted", deletedCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
