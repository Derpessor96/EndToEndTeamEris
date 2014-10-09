var data = require('../data');
var defaultPageSize = 10;

module.exports = {
    // POST /api/offers - create new offer
    createOffer: function(req, res, next){
        data.offers.createOffer(req.body, function(err, offer){
            if(err){
                res.status(400).send('Unable to create the requested offer');
            } else {
                res.send(offer);
            }
        });
    },
    // GET /api/user/:id/offers?page=x&orderBy=(_id, price, creationDate, title)&orderType=(asc, desc)
    getAllUserOffers: function(req, res, next) {
        var options = {};
        if(req.query) {
            options.size = req.query.size || defaultPageSize;
            options.page = req.query.page || 0;
            options.sortBy = req.query.orderBy || '_id';
            options.sortMethod = req.query.orderType || 'asc';
        }

        data.offers.getOffers({ seller: req.params.id }, options, function(err, collection) {
            if (err) {
                res.status(400).send();
            } else {
                res.send(collection);
            }
        });
    },
    getAllCategoryOffers: function(req, res, next) {
        var options = {};
        if(req.query) {
            options.size = req.query.size || defaultPageSize;
            options.page = req.query.page || 0;
            options.sortBy = req.query.orderBy || '_id';
            options.sortMethod = req.query.orderType || 'asc';
        }

        data.offers.getOffers({ category: req.params.id }, options, function(err, collection) {
            if (err) {
                res.status(400).send();
            } else {
                res.send(collection);
            }
        });
    },
    // GET /api/offers/
    getAllOffers: function(req, res, next) {
        var options = {};
        if(req.query) {
            options.size = req.query.size || defaultPageSize;
            options.page = req.query.page || 0;
            options.sortBy = req.query.orderBy || '_id';
            options.sortMethod = req.query.orderType || 'asc';
        }

        data.offers.getOffers({}, options, function(err, collection) {
            if (err) {
                res.status(400).send();
            } else {
                res.send(collection);
            }
        });
    },
    // GET /api/offers/:id
    getOfferById: function(req, res, next) {
        data.offers.findOffer(req.params.id, function(err, offer) {
            if (err) {
                res.status(404).send('Offer could not be found.');
            } else {
                res.send(offer);
            }
        });
    },
    // POST /api/offers/:id - accept offer
    acceptOffer: function(req, res, next){
        var buyerId;
        if(req.isAuthenticated()){
            buyerId = req.user._id;
            data.offers.findOffer(req.params.id, function(err, offer) {
                if (err) {
                    console.log('Offer could not be found: ' + err);
                    res.status(404).send();
                }
                data.sales.createSale(req.params.id, buyerId, function(err, sale){
                    if(sale) {
                        res.send(sale);
                    } else {
                        console.log(err);
                        res.status(400).send('Unable to buy the offer');
                    }
                });
            })
        } else {
            res.status(403).send();
        }
    }
};