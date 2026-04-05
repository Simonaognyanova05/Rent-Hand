const express = require('express');
const router = express.Router();
const about = require('../controllers/aboutController');
const contact = require('../controllers/contactController');

router.get('/about', about);
router.get('/contact', contact.contact_get);
router.post('/contact', contact.contact_post);

module.exports = router;