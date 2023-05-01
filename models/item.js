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
=======
    seated: { type: String, enum : ['on', 'off'] },
>>>>>>> 1237cfe13b55ce9b114bce386e325a14f1567ff4
    e_structure: String  //If seated, ID of the eventStructure
});

module.exports = mongoose.model('Item', ItemSchema);