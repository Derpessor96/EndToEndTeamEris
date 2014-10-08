var categoriesController = require('./CategoriesController'),
    offersController = require('./OffersController'),
    usersController = require('./UsersController'),
    salesController = require('./SalesController');


module.exports = {
    categories : categoriesController,
    offers : offersController,
    users: usersController,
    sales : salesController
};