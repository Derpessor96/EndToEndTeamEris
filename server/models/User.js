var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    pictureUrl: { type: String },
    role: { type: String, required: true }
});

var UserData = mongoose.model('User', userSchema);

module.exports = UserData;