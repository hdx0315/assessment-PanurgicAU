
// Validators/authValidator.js

const { body } = require('express-validator');

exports.validateLogin = [
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];


exports.validateRegister = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .trim(),
  body('email')
    .isEmail().withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];
