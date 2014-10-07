var categories = require('../models/category');

module.exports = {
    createCategory: function (categoryModel, callback) {
        categories.create(categoryModel, callback);
    },
    findCategory: function (name, callback) {
        categories.findOne({ 'name': name}, function (err, res) {
            callback(err, res);
        });
    }
};