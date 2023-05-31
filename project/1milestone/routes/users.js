var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', userController.showAll); //default
router.get('/show/:id', userController.show);
router.get('/create', userController.formCreate);
router.post('/create', userController.create);
router.post('/create2', userController.create2);
router.get('/edit/:id', userController.formEdit);
router.post('/edit/:id', userController.edit);
router.get('/delete/:id', userController.delete)
module.exports = router;