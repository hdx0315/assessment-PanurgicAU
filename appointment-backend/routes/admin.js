
// backend/routes/admin.js

const router = require('express').Router();
const { Appointment, User } = require('../models/admin');
const adminAuth = require('../middleware/adminAuth');

// Get all appointments with user details
router.get('/appointments', adminAuth, async (req, res) => {
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

module.exports = router;