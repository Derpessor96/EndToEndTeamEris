var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    var apiPrefix = '/api';


    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    /* User-related routes START*/

    //Get all users
    app.get(apiPrefix+'/user', controllers.usersController.getAllUsers);

    // Get user by ID
    app.get(apiPrefix+'/user/:id', controllers.usersController.getUserById);

    // Register new user
    app.post(apiPrefix+'/user', controllers.usersController.registerUser);

    // Update existing new user
    app.put(apiPrefix+'/user', controllers.usersController.updateUser);

    /*    User-related routes END   */
    /********************************/
    /* Category-related routes START*/

    // Get all categories
    app.get(apiPrefix+'/category', controllers.categoriesController.all);

    // Get category by ID
    app.get(apiPrefix+'/category/:id', controllers.categoriesController.findCategoryById);

    // Create new Category
    // TODO : add autorization for this route
    app.post(apiPrefix+'/category', controllers.categoriesController.createCategory);
    /* Category-related routes END*/
    /******************************/
    /* Offer-related routes Start*/

    // Get all Offers
    app.get(apiPrefix + '/offers', controllers.offersController.getAllOffers);

    //Get all Offers sorted, paginated and filtered by userId
    //GET /api/user/:id/offers?page=x&orderBy=(id, price, creationDate, title)&orderType=(asc, desc)
    app.get(apiPrefix + '/user/:id/offers', controllers.offersController.getAllUserOffers);

    // Get Offer by id
    app.get(apiPrefix + '/offers/:id', controllers.offersController.getOfferById);

    // Accept offer and generate sale
    // POST /api/offer/:id
    app.post(apiPrefix + '/offers/:id', controllers.offersController.acceptOffer);

    // Get all Offers by USER ID
    //app.get('/offer/:userId', function(req, res) {
    //    res.render('index');
    //});

    // Get all Offers by Category ID
    //app.get('/offer/:categoryId', function(req, res) {
    //    res.render('index');
    //});

    // Get latest Offers
    //app.get('/offer/latest', function(req, res) {
    //    res.render('index');
    //});

    // Get latest Offers by category
    //app.get('/offer/latest/:categoryId', function(req, res) {
    //    res.render('index');
    //});

    //Search Offers by title key word => TODO: receive an array of keywords
    //app.get('/offer/:titleKeyWord', function(req, res) {
    //    res.render('index');
    //});

    //Search Offers by description key word => TODO: receive an array of keywords
    //app.get('/offer/latest/:descriptionKeyWord', function(req, res) {
    //    res.render('index');
    //});

    // Create new Offer
    app.post(apiPrefix + '/offers', controllers.offersController.createOffer);
    /* Offer-related routes END*/
    /******************************/
    /* Offer-related routes Start*/

    //Get all Sales sorted, paginated and filtered by userId
    //GET /api/user/:id/sales?page=x&orderBy=(id, price, creationDate, title)&orderType=(asc, desc)
    app.get(apiPrefix + '/user/:id/sales', controllers.salesController.getAllSales);

    app.get('/', function(req, res) {
        res.render('index');
    });
};