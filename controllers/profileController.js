const Service = require('../models/service');

const profile_get = async (req, res) => {

    const user = req.session.user;

    // Моите услуги
    const services = await Service.find({
        userId: user._id
    }).lean();

    // Моите резервации
    const bookings = await Service.find({
        "availableTimes.userId": user._id
    }).lean();

    res.render('profile', {
        title: 'Profile',
        services,
        bookings,
        user
    });
};

module.exports = {
    profile_get
};