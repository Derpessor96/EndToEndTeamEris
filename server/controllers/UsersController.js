var users = require('../models/user');

module.exports = {
    registerUser: function (userModel, callback) {
        this.findUser({ username: userModel.username}, function (err, res) {
            if (res && res.length > 0) {
                callback(err, res);
            } else {
                users.create(userModel, callback);
            }
        });
    },
    findUser: function (username, callback) {
        users.findOne({ 'username': username }, function (err, res) {
            if (callback) {
                callback(err, res);
            }
        });
    }
};