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
router.get('/:id_e/tickets/create', ticketController.formCreate);
router.post('/:id_e/tickets/create', ticketController.create);
router.get('/:id_e/tickets/delete/:id', ticketController.delete );
  
module.exports = router;