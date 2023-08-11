const { storeReturnTo } = require('../middleware');
const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const user = require('../controllers/users');

router.route('/register')
.get(user.userPage)
.post(catchAsync(user.createUser));

router.route('/login')
.get(user.loginPage)
.post(storeReturnTo,passport.authenticate('local', {
    failureFlash: true, failureRedirect: '/login'
}), user.createLogin);

router.get('/logout', user.logoutPage);

module.exports = router;
