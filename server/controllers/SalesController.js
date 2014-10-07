var usersCtrl = require('./UsersController');
var sales = require('../models/sale');
var offers = require('../models/offer');

module.exports = {
    createSale: function(offerId, username, callback){
        var buyerId;
        usersCtrl.findUser(username, function(err, res){
            if(res) {
                buyerId = res._id;
                offers.findOne({ _id: offerId }, function(err, res){
                    if(res) {
                        if(!res.sold){
                            res.sold = true;
                            res.save(function(){
                                sales.create({
                                    offerId: offerId,
                                    buyerId: buyerId,
                                    saleDate: new Date()
                                }, function(err, res){
                                    callback(err, res);
                                })
                            });
                        } else {
                            callback({ message: 'Offer already sold' });
                        }
                    } else {
                        callback({ message: 'Invalid offer Id' });
                    }
                });
            } else {
                callback({ message: 'Invalid user Id'});
            }
        });
    }
};