
// backend/server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch(err => console.error('Database connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/appointments'));

app.use('/api/admin', require('./routes/admin'));
app.use('/api/admin/auth', require('./routes/adminAuth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
