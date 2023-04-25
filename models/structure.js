var mongoose = require('mongoose');

var StructureSchema = new mongoose.Schema({
    event_id: String,
    capacity: Number,
    sector: String,
    row: String,
    seat: String,
});

module.exports = mongoose.model('Structure', StructureSchema);