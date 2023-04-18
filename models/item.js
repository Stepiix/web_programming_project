var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: String,
    address: String,
    price: Number
});

module.exports = mongoose.model('Event', EventSchema);