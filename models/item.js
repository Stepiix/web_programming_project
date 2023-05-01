//item = event
var mongoose = require('mongoose');

var ItemSchema = new mongoose.Schema({
    name: String,
    date: Date,
    place_id: String,
    details: String,
    capacity: Number,
<<<<<<< HEAD
    seated: Boolean,
    e_structure: String,  //If seated, ID of the eventStructure
    image: File
=======
    seated: { type: String, enum : ['on', 'off'] },
    e_structure: String  //If seated, ID of the eventStructure
>>>>>>> 036e14fc747c86874a5dae35e8a594d1ff205f99
});

module.exports = mongoose.model('Item', ItemSchema);