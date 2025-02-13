
// backend/routes/adminAuth.js

const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin  = require('../models/admin');
require('dotenv').config();


router.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body;
    
    const admin = await Admin.findOne({ where: { email } });
    console.log('Admin found:', admin);
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });


    const token = jwt.sign(
      { id: admin.adminID, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      admin: { adminID: admin.adminID, email: admin.email } 
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
  
});

module.exports = router;