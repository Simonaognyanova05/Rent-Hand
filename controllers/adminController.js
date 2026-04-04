const Contact = require('../models/contact');

const admin_messages = async (req, res) => {

    const messages = await Contact.find()
        .sort({ date: -1 })
        .lean();

    res.render('admin-messages', {
        title: "Contact messages",
        messages
    });

};

module.exports = {
    admin_messages
};