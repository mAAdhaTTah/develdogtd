var moment = require('moment');

var config = {
  env: process.env.NODE_ENV || 'development',
  web: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '3000'
  },
  db: {
    host: process.env.DATABASE_URL || 'localhost',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'develdogtd',
    charset  : 'utf8'
  },
  time: {
    server: moment.ISO_8601,
    client: 'YYYY/MM/DD HH:mm'
  },
  sessionSecret: process.env.sessionSecret || 'keyboard cat'
};

config.github = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackUrl:  'http://' + config.web.host + ( config.env !== 'development' ? '' : ':' + config.web.port )  + '/auth/github/callback'
};

config.debug = config.env === 'development' ? true : false;

module.exports = config;
