var Category = require('mongoose').model('Category');

module.exports = {
    createCategory: function (req, res, callback) {
        var newCategory = req.body;
        Category.findOne({name:newCategory.name}).exec(function(err, category){
            if (err) {
                console.log(err);
            } else {
                if (!!category) {
                    console.log('Category already in the database');
                    callback(err, category);
                } else {
                    Category.create(newCategory, callback);
                    res.send({redirect: '/'});
                }
            }
        })
    },
    findCategoryByName: function (req, res, callback) {
        Category.findOne({name:req.body.name}).exec(function(error, category) {
            if (err) {
                console.log(err);
            } else {
                res.send(category);
            }
        })
    },
    findCategoryById: function (req, res, callback) {
        Category.findOne({_id:req.body.name}).exec(function(error, category) {
            if (err) {
                console.log(err);
            } else {
                res.send(category);
            }
        })
    },
    all:function(req, res, callback) {
        Category.find({}).exec(function(err, categories) {
            if (err) {
                console.log(err);
            } else {
                res.send(categories);
            }
        })
    }
};
