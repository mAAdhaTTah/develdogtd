var app = require('../../server');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var config = require('../../config');

/**
 * Initialize the app session
 * @param app
 */
module.exports = function(app) {
  app.use(session({
    store: new RedisStore({
      client: require('./redis'),
      disableTTL: true
    }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: true
  }));
};
