var express = require('express');

var app = express(),
    serverConfig = require('./server/config/config')['dev'];

require('./server/config/express')(app, serverConfig);
require('./server/config/mongoose')(serverConfig);
require('./server/config/passport')();
require('./server/config/routes')(app);

app.listen(serverConfig._PORT);
console.log("Server running on port: " + serverConfig._PORT);