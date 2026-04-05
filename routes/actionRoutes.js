const express = require('express');
const router = express.Router();
const book = require('../controllers/bookController');
const bookingActions = require('../controllers/bookingController');
const message = require('../controllers/messageController');
const { admin_messages } = require('../controllers/adminController');
const isAuth = require('../middlewares/isAuth');

router.get('/book/:serviceId/:timeId', isAuth, book.book_get);
router.post('/book/:serviceId/:timeId', isAuth, book.book_post);
router.post('/booking/accept/:serviceId/:timeId', isAuth, bookingActions.accept_booking);
router.post('/booking/reject/:serviceId/:timeId', isAuth, bookingActions.reject_booking);

router.post('/messages/:id', isAuth, message.send_service_message);
router.post('/reply/:serviceId/:messageId', isAuth, message.reply_message);
router.get('/admin-messages', isAuth, admin_messages);

module.exports = router;