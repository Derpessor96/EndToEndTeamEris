var usersData = require('./usersData');
var sales = require('../models/sale');

module.exports = {
    getSales: function (query, options, callback) {
        var page,
            size,
            sortBy;
        usersData.findUser(query.buyer, function (err, res) {
            if (res) {
                query.buyer = res;
            }
            sales.find(query, function (err, res) {
                if (options) {
                    page = options.page || 0;
                    size = options.size || 10;
                    sortBy = options.sortBy || '_id';
                    sortMethod = options.sortMethod || 'asc';

                    var sorted = res.sort(function (x, y) {
                        if (sortMethod == 'asc') {
                            return x[options.sortBy] > y[options.sortBy] ? 1 : x[options.sortBy] < y[options.sortBy] ? -1 : 0;
                        } else if (sortMethod == 'desc') {
                            return x[options.sortBy] > y[options.sortBy] ? -1 : x[options.sortBy] < y[options.sortBy] ? 1 : 0;
                        }
                    });
                    var paginated = sorted.slice(page * size, size);
                    if (callback) {
                        callback(err, paginated);
                    }
                }
            });
        });
    },
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