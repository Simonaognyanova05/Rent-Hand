const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/:serviceId/:timeId', bookController.book_get);

router.post('/:serviceId/:timeId', bookController.book_post);

module.exports = router;