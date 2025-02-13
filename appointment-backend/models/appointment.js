
// backend/models/appointment.js

// Appointments table structure

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Appointment extends Model {}

Appointment.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  time_slot: {
    type: DataTypes.STRING,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Appointment',
  timestamps: false
});

module.exports = { Appointment };