const Contact = require('../models/contact');

const contact_get = (req, res) => {
    res.render('contact', { title: 'Contact page' });
};

const contact_post = async (req, res) => {
    const messageData = req.body;

    try {
        const contact = new Contact(messageData);

        await contact.save();
        res.redirect('/');
    } catch (e) {
        console.log(e);
        res.redirect('/contact');
    }
}

module.exports = { contact_get, contact_post };