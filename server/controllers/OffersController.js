var offers = require('../models/offer');
var categoriesCtrl = require('./CategoriesController');
var usersCtrl = require('./UsersController');
var offerDaysDuration = 14;

module.exports = {
    createOffer: function (offerModel, callback) {
        categoriesCtrl.findCategory(offerModel.category, function (err, res) {
            offerModel.category = res;
            usersCtrl.findUser(offerModel.seller, function (err, res) {
                offerModel.seller = res;
                offerModel.creationDate = new Date();
                offerModel.expirationDate = new Date().setDate(offerModel.creationDate.getDate() + offerDaysDuration);
                offerModel.sold = false;
                offers.create(offerModel, callback);
            });
        });
    },
    getOffers: function (req, options, callback) {
        var page,
            size,
            sortBy;
        usersCtrl.findUser(req.seller, function (err, res) {
            if (res) {
                req.seller = res;
            }
            categoriesCtrl.findCategory(req.category, function (err, res) {
                if (res) {
                    req.category = res;
                }
                offers.find(req, function (err, res) {
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