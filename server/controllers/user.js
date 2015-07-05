var debug = require('debug')('develdogtd:controller:user');

module.exports = function(socket) {
  var user = socket.data.user;

  var api = {

    /**
     * Respond to user read event
     * @rest GET
     */
    'read': function() {
      debug('Retrieving user');
      socket.emit('user:returned', null, user.toJSON());
    },

    /**
     * Respond to user update event
     * @rest PUT
     */
    'update': function(data) {
      debug('Updating user');
      socket.data.user
        .save(data)
        .then(function(user) {
          debug('User updated');
          socket.emit('user:updated', null, user.toJSON());
        });
    },

    /**
     * Respond to user patch event
     * @rest PATCH
     */
    'patch': function(data) {
      debug('Patching user');
      socket.data.user
        .save(data, { patch: true })
        .then(function(user) {
          debug('User patched');
          socket.emit('user:patched', null, user.toJSON());
        });
    }
  };

  // @todo listen to redis

  //user.on('saved', function() {
  // @todo broadcast to redis
  //});

  /**
   * Return a function to provide access to the api
   */
  return function(name) {
    return api[name];
  };
};
