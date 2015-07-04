var expsession = require('express-session');
var RedisStore = require('connect-redis')(expsession);
var config = require('../../config');
var store = new RedisStore({
  client: require('../clients/redis'),
  disableTTL: true
});
var session = expsession({
  store: store,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true
});

/**
 * Initialize the app session
 * @param app
 */
module.exports = function(app) {
  if (app) {
    app.use(session);
  }

  return {
    express: session,
    store: store
  };
};
