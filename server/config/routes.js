module.exports = function(app) {
    app.get('/test', function(req, res) {
        res.render('index');
    });

};