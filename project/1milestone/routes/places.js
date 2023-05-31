var express = require('express');
var router = express.Router();
var placeController = require('../controllers/placeController');
var ticketController = require('../controllers/ticketController');

router.get('/', placeController.showAll ); //default
router.get('/showAll', placeController.showAll2 ); //Json
router.get('/create', placeController.formCreate);
router.post('/create', placeController.create);
router.get('/edit/:id', placeController.formEdit);
router.post('/edit/:id', placeController.edit);
router.get('/delete/:id', placeController.delete );

//router.get('/:id/tickets', ticketController.showAllPlace );
  
module.exports = router;