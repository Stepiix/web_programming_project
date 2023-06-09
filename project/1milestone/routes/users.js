var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get('/', userController.showAll); //default
router.get('/show/:id', userController.show);
router.post('/login', userController.check); //login
router.post('/register', userController.register); //register
router.get('/is-admin', userController.verifyAdmin); //admin verification
router.get('/create', userController.formCreate);
router.post('/create', userController.create);
router.post('/create2', userController.verifyToken,userController.create2);//add token verification
router.get('/edit/:id', userController.formEdit);
router.post('/edit/:id', userController.edit);
router.get('/delete/:id', userController.delete)
router.get('/user-info-endpoint', userController.profile);
module.exports = router;