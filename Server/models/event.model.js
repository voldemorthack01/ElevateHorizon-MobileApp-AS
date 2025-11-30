// models/event.model.js
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.STRING, allowNull: false }, // YYYY-MM-DD
      startTime: { type: DataTypes.STRING, allowNull: true }, // HH:MM
      endTime: { type: DataTypes.STRING, allowNull: true }, // HH:MM
      location: { type: DataTypes.STRING, allowNull: true },
      category: { type: DataTypes.STRING, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      capacity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      spotsRemaining: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      isCancelled: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      timestamps: true,
    }
  );

  return Event;
};
