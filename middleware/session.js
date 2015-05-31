var app = require('../server');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
  }));
}
