// models/index.js
const Sequelize = require("sequelize");
const sequelize = require("../database");

const EventModel = require("./event.model");
const RegistrationModel = require("./registration.model");

const Event = EventModel(sequelize, Sequelize.DataTypes);
const Registration = RegistrationModel(sequelize, Sequelize.DataTypes);

// Associations
Event.hasMany(Registration, {
  as: "registrations",
  foreignKey: "eventId",
  onDelete: "CASCADE",
});
Registration.belongsTo(Event, { foreignKey: "eventId", as: "event" });

module.exports = {
  sequelize,
  Event,
  Registration,
};
