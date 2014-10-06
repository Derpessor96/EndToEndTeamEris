var mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost:27017/Auction');
    var db = mongoose.connection;

    db.once('open', function(){
        console.log('Database open and running...');
    });

    db.on('error', function(err){
        console.log(err);
    });

    require('../models/user');
    require('../models/offer');
    require('../models/sale');
    require('../models/category');
};