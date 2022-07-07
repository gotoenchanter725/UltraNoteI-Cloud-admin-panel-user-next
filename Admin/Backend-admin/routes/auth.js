const express = require('express');
const router = express.Router();
const login = require('../controllers/auth/login');
const register = require('../controllers/auth/register');
const reset_password = require('../controllers/auth/reset_password');

router.post('/login', login.loginUser);
router.post('/register', register.registerUser);
router.post('/resetmail', reset_password.resetPassword_snedingMail);
router.post('/newpassword/:token', reset_password.resetPassword_newPassword);

module.exports = router;
