module.exports = function(socket, next) {

  /**
   * Grab the controller
   */
  var controller = require('../../controllers/actions')(socket);

  /**
   * Set up the routes
   */
  socket.on('actions:read', controller('read'));
  socket.on('actions:create', controller('create'));
  socket.on('actions:update', controller('update'));
  socket.on('actions:patch', controller('patch'));
  socket.on('actions:delete', controller('delete'));

  /**
   * Continue
   */
  next();
};
