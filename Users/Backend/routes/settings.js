const express = require('express');
const router = express.Router();
const change2fa = require('../controllers/user/settings');

router
    .post('/change2fa', change2fa.change_2FA)

module.exports = router;