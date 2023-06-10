var express = require('express');
var router = express.Router();
var itemController = require('../controllers/itemController');
var ticketController = require('../controllers/ticketController');
var t_TypeController = require('../controllers/t_typeController');

router.get('/', itemController.showAll); //default
router.get('/showAll', itemController.showAll2); //default
router.get('/show/:id', itemController.show);
router.get('/create', itemController.formCreate);
router.post('/create', itemController.create);
router.get('/edit/:id', itemController.formEdit);
router.post('/edit/:id', itemController.edit);
router.get('/delete/:id', itemController.delete);
router.post('/saveSale', itemController.saveSale);

router.get('/:id_e/tickets', ticketController.showAll);
router.get('/:id_e/tickets/create', ticketController.formCreate);
router.post('/:id_e/tickets/create', ticketController.create);
router.get('/:id_e/tickets/edit/:id', ticketController.formEdit);
router.post('/:id_e/tickets/edit/:id', ticketController.edit);
router.get('/:id_e/tickets/delete/:id', ticketController.delete);

router.get('/:id_e/tickets/allTypes', t_TypeController.showAll);
router.get('/:id_e/tickets/type', t_TypeController.formCreate);
router.post('/:id_e/tickets/allTypes', t_TypeController.create);
router.get('/:id_e/tickets/delType/:id', t_TypeController.delete);


module.exports = router;