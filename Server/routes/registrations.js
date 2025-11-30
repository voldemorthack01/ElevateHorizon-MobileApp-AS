// routes/registrations.js
const express = require("express");
const router = express.Router();
const { Registration, Event, sequelize } = require("../models");
const { Op } = require("sequelize");

// POST /api/registrations
// body: { eventId, fullName, email }
router.post("/", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { eventId, fullName, email } = req.body;
    if (!eventId || !fullName || !email) {
      await t.rollback();
      return res
        .status(400)
        .json({
          success: false,
          error: "eventId, fullName and email are required.",
        });
    }

    const event = await Event.findByPk(eventId, { transaction: t });
    if (!event) {
      await t.rollback();
      return res
        .status(404)
        .json({ success: false, error: "Event not found." });
    }

    if (event.isCancelled) {
      await t.rollback();
      return res
        .status(400)
        .json({ success: false, error: "Event is cancelled." });
    }

    if (event.spotsRemaining <= 0) {
      await t.rollback();
      return res.status(400).json({ success: false, error: "Event is full." });
    }

    // simple duplicate check: same email already registered to same event
    const existing = await Registration.findOne({
      where: { eventId, email },
      transaction: t,
    });
    if (existing) {
      await t.rollback();
      return res
        .status(400)
        .json({
          success: false,
          error: "This email is already registered for the event.",
        });
    }

    const registration = await Registration.create(
      { eventId, fullName, email },
      { transaction: t }
    );
    event.spotsRemaining = event.spotsRemaining - 1;
    await event.save({ transaction: t });

    await t.commit();
    res
      .status(201)
      .json({
        success: true,
        message: "Registration successful.",
        registrationId: registration.id,
      });
  } catch (err) {
    await t.rollback();
    console.error(err);
    res
      .status(500)
      .json({ success: false, error: "Unable to complete registration." });
  }
});

// GET /api/registrations/event/:eventId
router.get("/event/:eventId", async (req, res) => {
  try {
    const registrations = await Registration.findAll({
      where: { eventId: req.params.eventId },
      order: [["timestamp", "ASC"]],
    });
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch registrations." });
  }
});

// GET /api/registrations/user/:email
router.get("/user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const registrations = await Registration.findAll({
      where: { email },
      include: [{ model: Event, as: "event" }],
      order: [["timestamp", "ASC"]],
    });
    res.json(registrations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Unable to fetch user registrations." });
  }
});

module.exports = router;
