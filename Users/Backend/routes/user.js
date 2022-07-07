const express = require('express');
const router = express.Router();
const settings = require('../controllers/user/settings');
const dashboard = require('../controllers/user/dashboard');
const contact = require('../controllers/user/address_book');
const userActivity = require('../controllers/user/user_activity');

router.post('/change2fa', settings.change_2FA);
router.post('/change_currency', settings.change_currency);
router.post('/dashboard', dashboard.getDepositsAndWithdrawls);
router.post('/add_contact', contact.addContact);
router.post('/delete_contact', contact.deleteContact);
router.post('/user_activity', userActivity.getUserActivity);

module.exports = router;