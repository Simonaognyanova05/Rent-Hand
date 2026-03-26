const ServiceMessage = require('../models/serviceMessage');

const send_service_message = (req, res) => {

    const message = new ServiceMessage({
        serviceId: req.params.id,
        senderId: req.session.user._id,
        message: req.body.message

    })

    message.save()
        .then(() => {
            res.redirect('/catalog/' + req.params.id)
        })
        .catch(e => console.log(e))

}

module.exports = { send_service_message }