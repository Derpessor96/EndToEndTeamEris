var data = require('../data');
var defaultPageSize = 10;

module.exports = {
    //GET /api/user/:id/sales?page=x&orderBy=(id, price, creationDate, title)&orderType=(asc, desc)
    getAllSales: function (req, res, next) {
        var options = {};
        if (req.query) {
            options.size = req.query.size || defaultPageSize;
            options.page = req.query.page || 0;
            options.sortBy = req.query.orderBy || '_id';
            options.sortMethod = req.query.orderType || 'asc';
        }

        var result = [];
        // TODO: Research whether filter is for buyer, for seller or both, now is set for both
        data.sales.getAllSales({ sellerId: req.params.id }, options, function (err, collection) {
            if (err) {
                res.status(400).send();
            } else {
                for(var i = 0; i < collection.length; i++){
                    result.push(collection[i]);
                }
                data.sales.getAllSales({ buyerId: req.params.id }, options, function(err, otherCollection){
                    if (err) {
                        res.status(400).send();
                    } else {
                        for(var i = 0; i < otherCollection.length; i++){
                            result.push(otherCollection[i]);
                        }

                        if (options) {
                            var page = options.page || 0;
                            var size = options.size || 10;
                            var sortBy = options.sortBy || '_id';
                            var sortMethod = options.sortMethod || 'asc';

                            var sorted = result.sort(function (x, y) {
                                if (sortMethod == 'asc') {
                                    return x[options.sortBy] > y[options.sortBy] ? 1 : x[options.sortBy] < y[options.sortBy] ? -1 : 0;
                                } else if (sortMethod == 'desc') {
                                    return x[options.sortBy] > y[options.sortBy] ? -1 : x[options.sortBy] < y[options.sortBy] ? 1 : 0;
                                }
                            });
                            var paginated = sorted.slice(page * size, size + page * size);

                            res.send(paginated);
                            }
                        }
                    });
            }
        });
    }
};