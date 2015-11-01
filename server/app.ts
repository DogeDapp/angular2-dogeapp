/// <reference path='_references.ts' />
import http = require("http");
import url = require("url");
import express = require("express");
import bodyParser = require("body-parser");
//import methodOverride = require("method-override");
import errorHandler = require("errorhandler");
import path = require('path');
import session = require('express-session');

import routes = require('./controllers/IndexController');
import apiGameController = require('./api/GameController');
import testController = require('./api/TestController');

var app = express();

// Configuration
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join( __dirname, '/views') ); // critical to use path.join on windows
app.set('view engine', 'vash');
app.set('view options', { layout: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(methodOverride());
app.use(express.static(path.join(__dirname, '/../client')));


//session
app.use(session({
    secret: 'skkey-a1',
}));


var env = process.env.NODE_ENV || 'development';
app.use(errorHandler());

// Routes

//app.get('/', routes.index);
app.use('/', routes);
app.use('/api/game', apiGameController);
app.use('/test', testController); 


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

export var App = app;