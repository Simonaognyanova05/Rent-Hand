const Service = require('../models/service');

const send_service_message = async (req, res) => {

    const { id } = req.params;
    const { message } = req.body;

    const service = await Service.findById(id);

    service.messages.push({
        userId: req.session.user._id,
        email: req.session.user.email,
        conversation: [
            {
                sender: "user",
                message: message,
                date: new Date()
            }
        ]
    });

    await service.save();

    res.redirect(`/catalog/${id}`);
};


const reply_message = async (req, res) => {

    const { serviceId, messageId } = req.params;
    const { reply } = req.body;

    const service = await Service.findById(serviceId);

    const message = service.messages.id(messageId);

    message.conversation.push({
        sender: "owner",
        message: reply,
        date: new Date()
    });

    await service.save();

    res.redirect('/profile');
};

module.exports = {
    send_service_message,
    reply_message
};