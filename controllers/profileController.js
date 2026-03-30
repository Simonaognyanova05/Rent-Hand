const Service = require('../models/service');

const profile_get = async (req, res) => {

    const user = req.session.user;

    const services = await Service.find({
        userId: user._id
    });

    res.render('profile', {
        title: 'Profile',
        services
    });
};

module.exports = {
    profile_get
};