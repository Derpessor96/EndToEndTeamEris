var User = require('mongoose').model('User');

module.exports = {
    registerUser: function (req, res) {
        var newUser = req.body;

        User.find({ username: newUser.username}).exec(function (err, foundUser) {
            if (err){
                console.log(err);
            }
            else {
                if (foundUser && foundUser.length > 0) {
                    res.status(400).send('User already in the database');
                } else {
                    newUser.dateRegistered = new Date();
                    User.create(newUser, function(err, user){
                        if(err){
                            res.status(400).send;
                        } else {
                            res.send(user);
                        }
                    });
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