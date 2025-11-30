// database.js
require("dotenv").config();
const { Sequelize } = require("sequelize");

const DB_FILE = process.env.DB_FILE || "./database.sqlite";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: DB_FILE,
  logging: false,
});

module.exports = sequelize;
