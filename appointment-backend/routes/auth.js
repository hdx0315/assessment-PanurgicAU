
// backend/routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validateLogin } = require('../validators/authValidator');

// Login route
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("in be: ",email, password);
    
    // Find user by email
    const user = await User.findOne({ 
      where: { email } 
    });

    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ 
      userID: user.userID,
      email: user.email
    },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    res.json({ 
      token,
      user: {
        userID: user.userID,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;