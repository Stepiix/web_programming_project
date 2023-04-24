var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    position: String,
    price: Number
});

module.exports = mongoose.model('Item', ItemSchema);