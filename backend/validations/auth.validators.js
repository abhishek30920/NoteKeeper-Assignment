const { body } = require('express-validator');

const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];


const loginValidator = [
  body('email').trim().isEmail().withMessage('Valid email is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
];
  
module.exports = { registerValidator, loginValidator };

