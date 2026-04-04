const User = require('../models/user');
const bcrypt = require('bcrypt');

const login_get = (req, res) => {
    res.render('login', { title: 'Login page', error: null });
};

const login_post = async (req, res) => {

    const { identifier, password } = req.body;

    try {

        const user = await User.findOne({
            $or: [
                { email: identifier },
                { username: identifier }
            ]
        });

        if (!user) {
            return res.render('login', {
                title: "Login page",
                error: "Няма такъв потребител"
            });
        }

        const comparedPass = await bcrypt.compare(password, user.password);

        if (comparedPass) {

            req.session.user = user;

            if (user.role === "admin") {
                return res.redirect('/');
            }

            res.redirect('/');

        } else {

            return res.render('login', {
                title: "Login page",
                error: "Грешна парола!"
            });

        }

    } catch (e) {

        console.log(e);

        res.render('login', {
            title: "Login page",
            error: "Възникна грешка"
        });

    }

};

const logout = (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return console.log(err);
        }

        res.redirect('/');

    });

};

module.exports = {
    login_get,
    login_post,
    logout
};