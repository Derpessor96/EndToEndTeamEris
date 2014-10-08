var User = require('mongoose').model('User');

module.exports = {
    registerUser: function (req, res, callback) {
        var userModel = req.body;
        User.find({ username: userModel.username}).exec(function (err, foundUser) {
            if (err) console.log(err);
            else {
                if (foundUser && foundUser.length > 0) {
                    callback(err, foundUser);
                } else {
                    User.create(userModel, callback);
                }
            }
        });
    }
};
