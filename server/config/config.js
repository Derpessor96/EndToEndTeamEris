// Add constants here
var path = require('path');
var rootPath =  path.join(__dirname,'/../../');

module.exports = {
    dev : {
        rootPath: rootPath,
        _PORT: 7777,
        db: 'mongodb://localhost:27017/Auction'
    },
    prod : {
        rootPath: rootPath,
        _PORT: 7777,
        db: 'mongodb://localhost:27017/Auction'
    }
};