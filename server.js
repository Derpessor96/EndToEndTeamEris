var express = require('express');

var app = express(),
    serverConfig = require('./server/config/config')['dev'];

require('./server/config/mongoose')(serverConfig);
require('./server/config/express')(app, serverConfig);

app.listen(serverConfig._PORT);
console.log("Server running on port: " + serverConfig._PORT);

/*var users = require('./server/controllers/UsersController');
var categories = require('./server/controllers/CategoriesController');
var offers = require('./server/controllers/OffersController');
var sales = require('./server/controllers/SalesController');

//example usage of the auctionDb module
 users.registerUser({
 username: 'DonchoMinkov',
 name: 'Doncho Miknov',
 password: '123456q',
 role: 'admin'
 }, function(){
 categories.createCategory({
 name: 'Coats'
 });
 categories.createCategory({
 name: 'Miscellaneous'
 }, function(){
 offers.createOffer({
 seller: 'DonchoMinkov',
 category: 'Coats',
 title: "Brand new coat",
 description: "Warm, black, classic design, brand new, size 46.",
 price: 60.00
 }, function(){
 offers.createOffer({
 seller: 'DonchoMinkov',
 category: 'Miscellaneous',
 title: "Very old coat",
 description: "Warm, used, brown coat, size 46.",
 price: 20.00
 }, function() {
 offers.getOffers({ seller: 'DonchoMinkov', category: 'Coats' }, {
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
 });
    */

/*// example create sale: params (offerId, username) - if run please use real offerId
sales.createSale('543435e74630f2ac23cdedd2', 'DonchoMinkov', function(err, res){
 console.log(err);
 console.log(res);
 });*/