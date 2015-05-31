var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

/**
 * Enable JSON and cookie parsing
 * @param app
 */
module.exports = function(app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
};
