const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const isAuth = require('../middlewares/isAuth');

router.get('/', serviceController.service_index);
router.get('/catalog', serviceController.service_catalog);
router.get('/upload', isAuth, serviceController.service_create_get);
router.post('/services/upload', isAuth, serviceController.service_create_post);
router.get('/catalog/:id', serviceController.service_get_one);
router.get('/catalog/edit/:id', isAuth, serviceController.service_edit_get);
router.put('/catalog/edit/:id', isAuth, serviceController.service_edit_one);
router.delete('/catalog/:id', isAuth, serviceController.service_delete_one);

module.exports = router;