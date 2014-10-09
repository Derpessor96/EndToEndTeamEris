var usersData = require('./usersData');
var sales = require('../models/sale');
var offers = require('../models/offer');

module.exports = {
    getAllSales: function (callback) {
        sales.find({}, function (err, collection) {

              if (callback) {
                    callback(err, collection);
              }
        });
    },
    createSale: function(offerId, id, callback){
        var buyerId;
        usersData.findById(id, function(err, res){
            if(res) {
                buyerId = res._id;
                offers.findOne({ _id: offerId }, function(err, offer){
                    if(offer) {
                        console.log(buyerId);
                        console.log(offer.seller);
                        if(buyerId.toString().localeCompare(offer.seller.toString())){
                            callback({ message: 'Could not buy your own offer.'});
                        } else if(!offer.sold){
                            offer.sold = true;
                            offer.save(function(){
                                sales.create({
                                    offerId: offerId,
                                    buyerId: buyerId,
                                    sellerId: offer.seller,
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