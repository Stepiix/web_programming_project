var express = require('express');
var router = express.Router();
var itemController = require('../controllers/itemController');
var ticketController = require('../controllers/ticketController');

router.get('/', itemController.showAll ); //default
router.get('/show/:id', itemController.show );
router.get('/create', itemController.formCreate);
router.post('/create', itemController.create);
router.get('/edit/:id', itemController.formEdit);
router.post('/edit/:id', itemController.edit);
router.get('/delete/:id', itemController.delete );

router.get('/:id_e/tickets', ticketController.showAll );
  
module.exports = router;