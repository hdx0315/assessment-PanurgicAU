

// backend/routes/appointments.js

const express = require('express');
const router = express.Router();
const { Appointment } = require('../models/appointment'); // Ensure that the Appointment model is correctly imported
const auth = require('../middleware/auth');
const dayjs = require('dayjs');
const { Op } = require('sequelize');

router.get('/slots', auth, async (req, res) => {
  try {
    const { date } = req.query;
    
    if (!date || !dayjs(date).isValid()) {
      return res.status(400).json({ error: 'Invalid date parameter' });
    }

    const ddate = dayjs(date).toDate(); 
    console.log(ddate);
    console.log(typeof(ddate))

    const startOfDay = dayjs(date).startOf('day').toDate();
    const endOfDay = dayjs(date).endOf('day').toDate();

    const appointments = await Appointment.findAll({
      where: { 
        date: {
          [Op.gte]: startOfDay,
          [Op.lte]: endOfDay
        }
      },

      attributes: ['time_slot']
    });

    console.log("appoin",appointments)
    res.json(appointments.map(appt => appt.time_slot));

  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Error fetching slots' });
  }
});


router.get('/allApp', auth, async (req, res) => {
  try {

    const appointments = await Appointment.findAll()

    console.log("appoin",appointments)
    res.json(appointments);

  } catch (error) {
    console.error('Error fetching slots:', error);
    res.status(500).json({ error: 'Error fetching slots' });
  }
});

router.post('/appointments', auth, async (req, res) => {
  try {
    const { date, time_slot } = req.body;

    const existing = await Appointment.findOne({
      where: { date, time_slot }
    });

    if (existing) {
      return res.status(400).json({ error: 'Slot already booked' });
    }

    const appointment = await Appointment.create({
      date,
      time_slot,
      user_id: req.user.userID
    });

    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/appointments', auth, async (req, res) => {
  try {
    console.log("User in request:", req.user);
    const appointments = await Appointment.findAll({
      where: { user_id: req.user.userID },
      order: [['date', 'DESC'], ['time_slot', 'ASC']]
    });
    
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

router.delete('/appointments/:id', auth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the appointment by ID and user_id
    const appointment = await Appointment.findOne({
      where: {
        id,
        user_id: req.user.userID, // Ensure users can only cancel their own appointments
      },
    });

    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    // Delete the appointment
    await appointment.destroy();

    res.json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    console.error('Error canceling appointment:', error);
    res.status(500).json({ error: 'Server error while canceling appointment' });
  }
});


// Export router at the end
module.exports = router;