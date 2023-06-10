//item = event
var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    _id: String,
    name: String,
    date: Date,
    place_id: String,
    details: String,
    capacity: Number,
    seated: Boolean,
    seated: { type: String, enum : ['on', 'off'] },
    e_structure: String  //If seated, ID of the eventStructure
});

module.exports = mongoose.model('Item', ItemSchema);