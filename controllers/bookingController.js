const Service = require('../models/service');

const accept_booking = async (req, res) => {

    const { serviceId, timeId } = req.params;

    const service = await Service.findById(serviceId);

    const time = service.availableTimes.id(timeId);

    time.status = "accepted";

    await service.save();

    res.redirect('/profile');

};

const reject_booking = async (req, res) => {

    const { serviceId, timeId } = req.params;

    const service = await Service.findById(serviceId);

    const time = service.availableTimes.id(timeId);

    time.status = "rejected";

    await service.save();

    res.redirect('/profile');

};

module.exports = {
    accept_booking,
    reject_booking
};