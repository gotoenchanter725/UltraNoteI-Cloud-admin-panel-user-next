const express = require('express');
const router = express.Router();
const notifications = require('../controllers/notifications');
const routeverivication = require('../middlewares/routeverivication');
router.get('/', notifications.all);

module.exports = router;
