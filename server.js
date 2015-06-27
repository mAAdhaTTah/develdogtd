var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('./config');
var debug = require('debug')('develdogtd:server');

var app = express();

/**
 * Register middleware
 */
app.use(require('express-promise')());
require('./middleware/views')(app);
require('./middleware/logger')(app);
require('./middleware/parsing')(app);
require('./middleware/session')(app);
require('./middleware/auth')(app);

/**
 * Serve static files
 */
app.use(express.static(path.join(__dirname, './public')));

/**
 * Register routes
 */
app.use('/', require('./routes'));

module.exports = app;
