var auth = require('./auth')
module.exports = function(app) {
    app.get('/test', function(req, res) {
        res.render('index');
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    /* User-related routes START*/

    //Get all users
    app.get('/user', function(req, res) {
        res.render('index');
    });

    // Get user by ID
    app.get('/user/:id', function(req, res) {
        res.render('index');
    });

    // Register new user
    app.post('/user', function(req, res) {
        res.render('index');
    });

    /*    User-related routes END   */
    /********************************/
    /* Category-related routes START*/

    // Get all categories
    app.get('/category', function(req, res) {
        res.render('index');
    });

    // Get category by ID
    app.get('/category/:id', function(req, res) {
        res.render('index');
    });

    // Create new Category
    app.post('/user', function(req, res) {
        res.render('index');
    });
    /* Category-related routes END*/
    /******************************/
    /* Offer-related routes Start*/

    // Get all Offers
    app.get('/offer', function(req, res) {
        res.render('index');
    });

    // Get Offer by ID
    app.get('/offer/:id', function(req, res) {
        res.render('index');
    });

    // Get all Offers by USER ID
    app.get('/offer/:userId', function(req, res) {
        res.render('index');
    });

    // Get all Offers by Category ID
    app.get('/offer/:categoryId', function(req, res) {
        res.render('index');
    });

    // Get latest Offers
    app.get('/offer/latest', function(req, res) {
        res.render('index');
    });

    // Get latest Offers by category
    app.get('/offer/latest/:categoryId', function(req, res) {
        res.render('index');
    });

    //Search Offers by title key word => TODO: receive an array of keywords
    app.get('/offer/:titleKeyWord', function(req, res) {
        res.render('index');
    });

    //Search Offers by description key word => TODO: receive an array of keywords
    app.get('/offer/latest/:descriptionKeyWord', function(req, res) {
        res.render('index');
    });

    // Create new Offer
    app.post('/offer', function(req, res) {
        res.render('index');
    });
    /* Offer-related routes END*/
    /******************************/
    /* Offer-related routes Start*/
};