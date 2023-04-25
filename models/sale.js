var mongoose = require('mongoose');

var SaleSchema = new mongoose.Schema({
    t_type: String,
    customer_id: Date,
    event_id: String,
    seat: String    //If we use a precise seat
});

module.exports = mongoose.model('Sale', SaleSchema);