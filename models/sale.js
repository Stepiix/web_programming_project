var mongoose = require('mongoose');

var SaleSchema = new mongoose.Schema({
    ticket_id: String,
    customer_id: String,
    event_id: String,
    seat: String    //If we use a precise seat
});

module.exports = mongoose.model('Sale', SaleSchema);