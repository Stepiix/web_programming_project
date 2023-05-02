var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    _id: String,
    name: String,
    phonenumber: String,
    email: String,
    administrator: Boolean,
});

module.exports = mongoose.model('User', UserSchema);