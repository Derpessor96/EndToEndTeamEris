var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateRegistered: { type: Date, required: true },
    pictureUrl: { type: String },
    role: { type: String, default: 'user', required: true }
});

var UserData = mongoose.model('User', userSchema);

module.exports = UserData;