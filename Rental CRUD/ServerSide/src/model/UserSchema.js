const { DataTypes } = require('sequelize');
const sequelize = require('../db/connection');

const User = sequelize.define('User', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAccountVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  accountVerificationToken: {
    type: DataTypes.STRING,
  },
  accountVerificationExpires: {
    type: DataTypes.DATE,
  },
  accountVerificationTokenExpires: {
    type: DataTypes.DATE,
  },
  passwordChangedAt: {
    type: DataTypes.DATE,
  },
  passwordRestToken: {
    type: DataTypes.STRING,
  },
  passwordResetExpires: {
    type: DataTypes.DATE,
  },
}, {

});

module.exports = User;


