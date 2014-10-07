var express = require('express');

var app = express(),
    serverConfig = require('./server/config/config')['dev'];


require('./server/config/express')(app, serverConfig);
require('./server/config/mongoose')(serverConfig);

app.listen(serverConfig._PORT);
console.log("Server running on port: " + serverCofig._PORT);