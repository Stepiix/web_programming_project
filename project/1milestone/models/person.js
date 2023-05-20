var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: String,
    phonenumber: String,
    email: String,
    administrator: Boolean,
});

module.exports = mongoose.model('User', UserSchema);