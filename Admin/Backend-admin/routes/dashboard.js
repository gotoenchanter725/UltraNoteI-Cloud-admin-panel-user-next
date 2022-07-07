const express = require('express');
const router = express.Router();

const dashboard = require('../controllers/dashboard');

router.post('/', dashboard);

module.exports = router;
