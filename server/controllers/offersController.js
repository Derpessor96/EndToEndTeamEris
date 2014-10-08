var data = require('../data');

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
    // GET /api/user/:id/offers?page=x&orderBy=(id, price, creationDate, title)&orderType=(asc, desc)
    // TODO: Parse the query string, better error handling
    getAllOffers: function(req, res, next) {
        data.offers.getOffers({}, {}, function(err, collection) {
            if (err) {
                console.log('Offers could not be loaded: ' + err);
            }

            res.send(collection);
        });
    },
    // GET /api/offers/:id
    getOfferById: function(req, res, next) {
        data.offers.findOne({_id: req.params.id}).exec(function(err, offer) {
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
            data.offers.findOne({_id: req.params.id}).exec(function(err, offer) {
                if (err) {
                    console.log('Offer could not be found: ' + err);
                    res.status(404).send();
                }
                data.sales.createSale(req.params.id, buyerId, function(err, sale){
                    if(sale) {
                        res.send(sale);
                    } else {
                        res.status(400).send('Unable to buy the offer');
                    }
                });
            })
        } else {
            res.status(403).send();
        }
    }
};