//item = event
var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    date: Date,
    place_id: String,
    details: String,
    capacity: Number,
    seated: Boolean,
    e_structure: String,  //If seated, ID of the eventStructure
    image: File
});

module.exports = mongoose.model('Item', ItemSchema);