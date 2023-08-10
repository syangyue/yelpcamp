const { storeReturnTo } = require('../middleware');
const express = require('express');
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const user = require('../controllers/users');

router.get('/register', user.userPage);

router.post('/register', catchAsync(user.createUser));

router.get('/login', user.loginPage)

router.post('/login', storeReturnTo, passport.authenticate('local', {
    failureFlash: true, failureRedirect: '/login'
}), user.createLogin);

router.get('/logout', user.logoutPage);

module.exports = router;
