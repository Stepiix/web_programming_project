var express = require('express');
var router = express.Router();
var salesController = require('../controllers/salesController');

router.get('/', salesController.showAll ); //default
// router.get('/show/:id', itemController.show );
// router.get('/create', itemController.formCreate);
// router.post('/create', itemController.create);
// router.get('/edit/:id', itemController.formEdit);
// router.post('/edit/:id', itemController.edit);
router.get('/delete/:id', salesController.delete );
module.exports = router;