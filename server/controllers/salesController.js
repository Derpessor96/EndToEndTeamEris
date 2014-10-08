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

        // TODO: Research whether it is buyer or seller ot both
        data.sales.getSales({ seller: req.params.id }, options, function (err, collection) {
            if (err) {
                res.status(400).send();
            } else {
                res.send(collection);
            }
        });
    }
};