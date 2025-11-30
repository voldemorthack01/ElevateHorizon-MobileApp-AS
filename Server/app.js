// app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");

const eventsRouter = require("./routes/events");
const registrationsRouter = require("./routes/registrations");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // allow all origins by default - fine for classroom / Expo
app.use(express.json());

// API prefix
app.use("/api/events", eventsRouter);
app.use("/api/registrations", registrationsRouter);

// health
app.get("/api/health", (req, res) => res.json({ status: "ok" }));

// start server after DB is ready
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
    // sync without forcing - seed handles initial data
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`Base API: http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
})();
