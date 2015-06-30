var expsession = require('express-session');
var RedisStore = require('connect-redis')(expsession);
var config = require('../../config');
var session = expsession({
  store: new RedisStore({
    client: require('./redis'),
    disableTTL: true
  }),
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

  return session;
};
