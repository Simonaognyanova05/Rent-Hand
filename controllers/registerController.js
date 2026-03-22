const bcrypt = require('bcrypt');
const User = require('../models/user');

const register_get = (req, res) => {
    res.render('register', { title: 'Register page', error: null });
};


const register_post = async (req, res) => {
    try {
        const { username, email, password, rePass } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.render('register', {
                title: "Register page",
                error: "Потребителското име вече е заето!"
            });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.render('register', {
                title: "Register page",
                error: "Имейлът вече е регистриран!"
            });
        }

        if (password !== rePass) {
            return res.render('register', {
                title: 'Register page',
                error: 'Паролите не съвпадат'
            });
        }

        if (password.length < 6) {
            return res.render('register', {
                title: 'Register page',
                error: 'Паролата трябва да е минимум 6 символа!'
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hash
        });

        await user.save();

        res.redirect('/');

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    register_get,
    register_post
};