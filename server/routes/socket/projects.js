module.exports = function(socket, next) {

  /**
   * Grab the controller
   */
  var controller = require('../../controllers/projects')(socket);

  /**
   * Set up the routes
   */
  socket.on('projects:read', controller('read'));
  socket.on('projects:create', controller('create'));
  socket.on('projects:update', controller('update'));
  socket.on('projects:patch', controller('patch'));
  socket.on('projects:delete', controller('delete'));

  /**
   * Continue
   */
  next();
};
