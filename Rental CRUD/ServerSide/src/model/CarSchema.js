const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Car = sequelize.define('Car', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  milage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  availableFrom: {
    type: DataTypes.STRING,
  },
  availableTill: {
    type: DataTypes.STRING,
  },
  perKm: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  carDetails: {
    type: DataTypes.STRING,
  },
  Details: {
    type: DataTypes.STRING,
  },
  AdminId: {
    type: DataTypes.STRING,
  },
}, {
  // Other options
});

module.exports = Car;
