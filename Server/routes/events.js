// routes/events.js
const express = require("express");
const router = express.Router();
const { Event } = require("../models");
const { Op } = require("sequelize");

// GET /api/events
// Optional query params: date=YYYY-MM-DD, category=..., search=...
router.get("/", async (req, res) => {
  try {
    const { date, category, search } = req.query;
    const where = {};

    if (date) where.date = date;
    if (category) where.category = category;
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
      ];
    }

    const events = await Event.findAll({
      where,
      order: [
        ["date", "ASC"],
        ["startTime", "ASC"],
      ],
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch events." });
  }
});

// GET /api/events/today
router.get("/today", async (req, res) => {
  try {
    const today = req.query.date || new Date().toISOString().slice(0, 10); // allow passing date for testing
    const events = await Event.findAll({
      where: { date: today },
      order: [["startTime", "ASC"]],
    });
    res.json(events);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch today's events." });
  }
});

// GET /api/events/:id
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found." });
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch event." });
  }
});

// POST /api/events
router.post("/", async (req, res) => {
  try {
    const {
      title,
      date,
      startTime,
      endTime,
      location,
      category,
      description,
      capacity,
    } = req.body;
    if (!title || !date)
      return res.status(400).json({ error: "Title and date are required." });

    const cap = parseInt(capacity || 0, 10);
    const event = await Event.create({
      title,
      date,
      startTime,
      endTime,
      location,
      category,
      description,
      capacity: cap,
      spotsRemaining: cap,
    });

    res.status(201).json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to create event." });
  }
});

// PUT /api/events/:id
router.put("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found." });

    const updatable = [
      "title",
      "date",
      "startTime",
      "endTime",
      "location",
      "category",
      "description",
      "capacity",
      "isCancelled",
    ];
    updatable.forEach((k) => {
      if (req.body[k] !== undefined) event[k] = req.body[k];
    });

    // if capacity changed ensure spotsRemaining is adjusted but not negative
    if (req.body.capacity !== undefined) {
      const newCap = parseInt(req.body.capacity, 10) || 0;
      const used = event.capacity - event.spotsRemaining; // previously booked
      const newSpotsRemaining = Math.max(0, newCap - used);
      event.capacity = newCap;
      event.spotsRemaining = newSpotsRemaining;
    }

    await event.save();
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to update event." });
  }
});

// DELETE /api/events/:id
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ error: "Event not found." });
    await event.destroy();
    res.json({ success: true, message: "Event deleted." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to delete event." });
  }
});

module.exports = router;
