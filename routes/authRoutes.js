const express = require('express');
const router = express.Router();
const login = require('../controllers/loginController');
const register = require('../controllers/registerController');
const profile = require('../controllers/profileController');
const isAuth = require('../middlewares/isAuth');

router.get('/login', login.login_get);
router.post('/login', login.login_post);
router.get('/register', register.register_get);
router.post('/register', register.register_post);
router.get('/logout', login.logout);
router.get('/profile', isAuth, profile.profile_get);

module.exports = router;