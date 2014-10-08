var User = require('mongoose').model('User');

module.exports = {
    registerUser: function (req, res, callback) {
        var userModel = req.body;

        User.find({ username: userModel.username}).exec(function (err, foundUser) {
            if (err){
                console.log(err);
            }
            else {
                if (foundUser && foundUser.length > 0) {
                    console.log('User already in the database');
                    callback(err, foundUser);
                } else {
                    User.create(userModel, callback);
                }
            }
        });
    },
    getAllUsers: function(req, res, callback) {
        User.find({}).exec(function (err, users) {
            if (err){
                console.log(err);
            }
            else {
                res.send(users);
            }
        })
    },
    getUserById: function(req, res, callback) {
        User.findOne({_id:req.params.id}).exec(function (err, user) {
            if (err){
                console.log(err);
            }
            else {
                res.send(user);
            }
        })
    },
    updateUser: function(req, res, next) {
        if (req.user._id == req.body._id || req.user.roles.indexOf('admin') > -1) {
            var updatedUserData = req.body;
            if (updatedUserData.password && updatedUserData.password.length > 0) {
                updatedUserData.salt = encryption.generateSalt();
                updatedUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
            }

            User.update({_id: req.body._id}, updatedUserData, function() {
                res.end();
            })
        }
        else {
            res.send({reason: 'You do not have permissions!'})
        }
    },
};