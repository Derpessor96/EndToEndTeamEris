var express = require('express'),
    passport = require('passport'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
	session = require('express-session');

module.exports = function(app, config) {

    app.set('view engine', 'jade');
    app.set('views', path.join(config.rootPath,'/server/views'));

    app.use(favicon(config.rootPath + '/public/img/favicon.ico'));

    app.use(cookieParser());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(logger('dev'));

    app.use(session({resave: true, saveUninitialized: true, secret: 'vaxklowxkwjs'}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(config.rootPath + '/public'));
};



