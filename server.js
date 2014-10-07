var serverCofig = require('./server/config/config'),
    express = require('express');

var app = express();

require('./server/config/express')(app, serverCofig);

app.listen(serverCofig._PORT);
console.log("Server running on port: " + serverCofig._PORT);