const express = require('express');
const router = express.Router();
const users = require('../controllers/users');
const routeverivication = require('../middlewares/routeverivication');
router.get('/user_list',routeverivication,users.userList);
router.post('/suspended_user',routeverivication,users.suspendedUser);
router.get('/activeUsers',routeverivication,users.ActiveUser);
router.get('/deleted_user', users.deletedUser);
router.post('/pending_email', users.pendingEmial);
router.post('/add_user', users.addUser);
router.put('/suspend_user', users.suspendUser);
router.put('/delete_user', users.deleteUser);
router.put('/activate_email', users.activateEmail);
router.post('/user_profile', users.userProfile);
router.post('/user_profile_update', users.userProfileUpdate);
router.put('/profile_update', users.profileUpdate);

module.exports = router;
