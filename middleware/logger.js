var logger = require('morgan');
var config = require('../config');

/**
 * Set up logging based on environment
 * @param app
 */
module.exports = function(app) {
  app.use(logger(config.debug ? 'dev' : 'short'));
};
