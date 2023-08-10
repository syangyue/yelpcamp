const User = require('../models/user');
const campground = require('../models/campground')

module.exports.userPage = (req, res) => {
    res.render('users/register');
};

module.exports.createUser = async(req, res, next) => {
    try{
        const { email, username, password } = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', 'Welcome to yelp camp!');
            res.redirect('/campgrounds');
        })

    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }

};

module.exports.loginPage = (req, res) => {
    res.render('users/login');
};

module.exports.createLogin = (req, res) => {
    req.flash('success', 'Welcome back!');
    const redirectUrl = res.locals.returnTo || '/campgrounds';
    res.redirect(redirectUrl);

};

module.exports.logoutPage = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
});
}
