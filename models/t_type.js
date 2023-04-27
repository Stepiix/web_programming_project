var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
    event_id: String,
    type_id: String,
    price: Number,
});

module.exports = mongoose.model('Ticket', TicketSchema);