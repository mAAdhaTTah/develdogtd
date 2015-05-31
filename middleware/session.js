var app = require('../server');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

module.exports = session({
  store: new RedisStore({
    client: require('./redis'),
    disableTTL: true
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});
