var User = require('mongoose').model('User');

module.exports = {
    registerUser: function (req, res, callback) {
        console.log('In register');
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
    }
};
