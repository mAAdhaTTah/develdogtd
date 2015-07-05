module.exports = function(socket, next) {

  /**
   * Grab the controller
   */
  var controller = require('../../controllers/contexts')(socket);

  /**
   * Set up the routes
   */
  socket.on('contexts:read', controller('read'));
  socket.on('contexts:create', controller('create'));
  socket.on('contexts:update', controller('update'));
  socket.on('contexts:patch', controller('patch'));
  socket.on('contexts:delete', controller('delete'));

  /**
   * Continue
   */
  next();
};
