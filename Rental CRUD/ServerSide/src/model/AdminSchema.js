const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const Admin = sequelize.define('Admin', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
});

module.exports = Admin;
