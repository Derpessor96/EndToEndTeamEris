var offers = require('../models/offer');
var categoriesData = require('./categoriesData');
var usersData = require('./usersData');
var offerDaysDuration = 14;

module.exports = {
    createOffer: function (offerModel, callback) {
        categoriesData.findCategory(offerModel.category, function (err, res) {
            offerModel.category = res;
            usersData.findUser(offerModel.seller, function (err, res) {
                offerModel.seller = res;
                offerModel.creationDate = new Date();
                offerModel.expirationDate = new Date().setDate(offerModel.creationDate.getDate() + offerDaysDuration);
                offerModel.sold = false;
                offers.create(offerModel, callback);
            });
        });
    },
    getOffers: function (query, options, callback) {
        var page,
            size,
            sortBy;
        usersData.findUser(query.seller, function (err, res) {
            if (res) {
                query.seller = res;
            }
            categoriesData.findCategory(query.category, function (err, res) {
                if (res) {
                    query.category = res;
                }
                offers.find(query, function (err, res) {
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
            })
        });
    }
};