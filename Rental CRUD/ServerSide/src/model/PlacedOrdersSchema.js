const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.STRING,
  },
  Details: {
    type: DataTypes.STRING,
  },
  carDetails: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  perKm: {
    type: DataTypes.NUMBER,
  },
  image: {
    type: DataTypes.STRING,
  },
  origin: {
    type: DataTypes.STRING,
  },
  destination: {
    type: DataTypes.STRING,
  },
  startDate: {
    type: DataTypes.STRING,
  },
  endDate: {
    type: DataTypes.STRING,
  },
  BookingId: {
    type: DataTypes.STRING,
  },
  date: {
    type: DataTypes.STRING,
  },
  time: {
    type: DataTypes.STRING,
  },
  carId: {
    type: DataTypes.STRING,
  },
  pricekm: {
    type: DataTypes.NUMBER,
  },
  pricing: {
    type: DataTypes.NUMBER,
  },
  Tax: {
    type: DataTypes.NUMBER,
  },
  total: {
    type: DataTypes.NUMBER,
  },
  distance: {
    type: DataTypes.NUMBER,
  },
  MapImg: {
    type: DataTypes.STRING,
  },
  Subtotal: {
    type: DataTypes.NUMBER,
  },
}, {

});

module.exports = Order;
