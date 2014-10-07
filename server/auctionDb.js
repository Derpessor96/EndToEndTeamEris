//var db = require('./auctionDb');

/*//example usage of the auctionDb module
db.registerUser({
    username: 'DonchoMinkov',
    name: 'Doncho Miknov',
    password: '123456q',
    role: 'admin'
}, function(){
    db.createCategory({
       name: 'Coats'
    });
    db.createCategory({
        name: 'Miscellaneous'
    }, function(){
        db.createOffer({
            seller: 'DonchoMinkov',
            category: 'Coats',
            title: "Brand new coat",
            description: "Warm, black, classic design, brand new, size 46.",
            price: 60.00
        }, function(){
            db.createOffer({
                seller: 'DonchoMinkov',
                category: 'Miscellaneous',
                title: "Very old coat",
                description: "Warm, used, brown coat, size 46.",
                price: 20.00
            }, function() {
                db.getOffers({ seller: 'DonchoMinkov', category: 'Coats' }, {
                    sortBy: 'creationDate',
                    sortMethod: 'desc',
                    page: 0,
                    size: 3
                }, function(err, res){
                    console.log(res);
                });
            });
        });
    });
});*/

/*// example create sale: params (offerId, username) - if run please use real offerId
db.createSale('5433d7f42e72a1501f5101f9', 'DonchoMinkov', function(err, res){
    console.log(err);
    console.log(res);
});*/

require('./config/mongoose')();
var users = require('./models/user');
var offers = require('./models/offer');
var sales = require('./models/sale');
var categories = require('./models/category');
var offerDaysDuration = 14;

module.exports = {
    registerUser: function(userModel, callback){
        this.findUser({ username: userModel.username}, function(err, res){
            if(res && res.length > 0){
                callback(err, res);
            } else {
                users.create(userModel, callback);
            }
        });
    },
    createCategory: function(categoryModel, callback){
      categories.create(categoryModel, callback);
    },
    findUser: function(username, callback){
        users.findOne({ 'username': username }, function(err, res){
            if(callback) {
                callback(err, res);
            }
        });
    },
    findCategory: function(name, callback){
      categories.findOne({ 'name': name}, function(err, res){
          callback(err, res);
      });
    },
    createOffer: function(offerModel, callback){
        var that = this;
        this.findCategory(offerModel.category, function(err, res){
            offerModel.category = res;
            that.findUser(offerModel.seller, function(err, res){
               offerModel.seller = res;
               offerModel.creationDate = new Date();
               offerModel.expirationDate = new Date().setDate(offerModel.creationDate.getDate() + offerDaysDuration);
               offerModel.sold = false;
               offers.create(offerModel, callback);
            });
        });
    },
    getOffers: function(req, options, callback){
        var page,
            size,
            sortBy,
            that = this;
        this.findUser(req.seller, function(err, res){
            if(res) {
                req.seller = res;
            }
            that.findCategory(req.category, function(err, res){
                if(res) {
                    req.category = res;
                }
                offers.find(req, function(err, res) {
                    if (options) {
                        page = options.page || 0;
                        size = options.size || 10;
                        sortBy = options.sortBy || '_id';
                        sortMethod = options.sortMethod || 'asc';

                        var sorted = res.sort(function(x, y){
                            if(sortMethod == 'asc'){
                                return x[options.sortBy] > y[options.sortBy] ? 1 : x[options.sortBy] < y[options.sortBy] ? -1 : 0;
                            } else if(sortMethod == 'desc'){
                                return x[options.sortBy] > y[options.sortBy] ? -1 : x[options.sortBy] < y[options.sortBy] ? 1 : 0;
                            }
                        });
                        var paginated = sorted.slice(page * size, size);
                        if(callback) {
                            callback(err, paginated);
                        }
                    }
                });
            })
        });
    },
    createSale: function(offerId, username, callback){
        var buyerId;
        this.findUser(username, function(err, res){
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