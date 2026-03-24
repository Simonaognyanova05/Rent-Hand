const isAuth = (req, res) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};

module.exports = isAuth;