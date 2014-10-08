var User = require('../models/user');

module.exports = {
    registerUser: function (req, res, callback) {
        var userModel = req.body;

        this.findUser({ username: userModel.username}, function (err, foundUser) {
            if (err) console.log(err);
            else {
                if (foundUser && foundUser.length > 0) {
                    callback(err, foundUser);
                } else {
                    User.create(userModel, callback);
                }
            }
        });
    },
    findUser: function (username, callback) {
        User.findOne({ 'username': username }, function (err, res) {
            if (callback) {
                callback(err, res);
            }
        });
    }
};