var usersData = require('./usersData');
var sales = require('../models/sale');
var offers = require('../models/offer');

module.exports = {
    createSale: function(offerId, username, callback){
        var buyerId;
        usersData.findUser(username, function(err, res){
            if(res) {
                buyerId = res._id;
                offers.findOne({ _id: offerId }, function(err, offer){
                    if(offer) {
                        if(buyerId === offer.seller){
                            callback({ message: 'Could not buy your own offer.'});
                        }
                        if(!offer.sold){
                            offer.sold = true;
                            offer.save(function(){
                                sales.create({
                                    offerId: offerId,
                                    buyerId: buyerId,
                                    saleDate: new Date()
                                }, function(err, sale){
                                    callback(err, sale);
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