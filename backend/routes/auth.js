const express = require('express');
const { registerValidator, loginValidator } = require('../validations/auth.validators');
const { register, login } = require('../controllers/auth');


const router = express.Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);

module.exports = router;