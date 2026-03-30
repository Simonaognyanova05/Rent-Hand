const Service = require('../models/service');

const book_get = async (req, res) => {

    const { serviceId, timeId } = req.params;

    const service = await Service.findById(serviceId);

    const selectedTime = service.availableTimes.id(timeId);

    res.render('book', {
        title: 'Book service',
        service,
        selectedTime
    });
};

const book_post = async (req, res) => {

    const { serviceId, timeId } = req.params;

    const service = await Service.findById(serviceId);

    const time = service.availableTimes.id(timeId);

    time.booked = true;

    await service.save();

    res.redirect(`/services/${serviceId}`);
};

module.exports = {
    book_get,
    book_post
};