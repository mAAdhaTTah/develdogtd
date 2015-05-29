var app = require('../server');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redis;

if (process.env.REDISTOGO_URL) {
  var rtg   = require('url').parse(process.env.REDISTOGO_URL);
  redis = require('redis').createClient(rtg.port, rtg.hostname);

  redis.auth(rtg.auth.split(":")[1]);
} else {
  redis = require('redis').createClient();
}

module.exports = session({
  store: new RedisStore({
    client: redis,
    disableTTL: true
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});
