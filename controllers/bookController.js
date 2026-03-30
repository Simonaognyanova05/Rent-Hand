const Service = require('../models/service');

const book_get = async (req, res) => {

    const { serviceId, timeId } = req.params;

    const service = await Service.findById(serviceId);

    const time = service.availableTimes.id(timeId);

    res.render('book', {
        title: 'Book service',
        service,
        time
    });
};

const book_post = async (req, res) => {

    const { serviceId, timeId } = req.params;

    const { email, message } = req.body;

    const service = await Service.findById(serviceId);

    const time = service.availableTimes.id(timeId);

    time.booked = true;
    time.email = email;
    time.message = message;
    time.userId = req.session.user._id;

    await service.save();

    res.redirect(`/catalog/${serviceId}`);
};

module.exports = {
    book_get,
    book_post
};