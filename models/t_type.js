<<<<<<< HEAD
var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
    event_id: String,
    type_id: String,
    price: Number,
});

module.exports = mongoose.model('Ticket', TicketSchema);
=======
var mongoose = require('mongoose');

var T_TypeSchema = new mongoose.Schema({
    event_id: String,
    type: String,
    price: Number
});

module.exports = mongoose.model('T_Type', T_TypeSchema);
>>>>>>> 16dcc806cb550a9695eed784f9a7a8ae5d764f68
