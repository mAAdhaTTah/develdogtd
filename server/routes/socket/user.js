var debug = require('debug')('develdogtd:socket:user');

module.exports = function(socket, next) {

  /**
   * Grab the controller
   */
  var controller = require('../../controllers/user')(socket);

  /**
   * Set up the routes
   */
  socket.on('user:read', controller('read'));
  socket.on('user:update', controller('update'));
  socket.on('user:patch', controller('patch'));

  /**
   * Continue
   */
  next();
};
