const Service = require('../models/service');

const send_service_message = async (req, res) => {

    const { id } = req.params;

    const { message } = req.body;

    const service = await Service.findById(id);

    service.messages.push({
        userId: req.session.user._id,
        email: req.session.user.email,
        message
    });

    await service.save();

    res.redirect(`/catalog/${id}`);

};

module.exports = {
    send_service_message
};