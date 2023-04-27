var mongoose = require('mongoose');

var TicketSchema = new mongoose.Schema({
    event_id: String,
    sale_id: String,
});

module.exports = mongoose.model('Ticket', TicketSchema);