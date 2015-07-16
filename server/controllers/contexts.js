var _ = require('lodash');
var debug = require('debug')('develdogtd:controller:contexts');

module.exports = function(socket) {
  var contexts = socket.request.user.related('contexts');
  // @todo maybe move to model itself?
  var whitelist = ['parent_id', 'context_id', 'name', 'notes', 'due', 'completed', 'completedAt'];

  var api = {

    /**
     * Respond to contexts read event
     * @rest GET
     */
    'read': function(data) {
      debug('Retrieving context');
      var event = 'contexts:returned';

      if (!data.id) {
        return socket.emit(event, null, scontexts.toJSON());
      }

      var context = scontexts.get(data.id);

      if (!context) {
        return socket.emit(event, { messge: 'No context with provided ID' }, null);
      }

      socket.emit(event, null, context.toJSON());
    },

    /**
     * Respond to contexts update event
     * @rest POST
     */
    'create': function(data) {
      debug('Creating context');
      var event = 'contexts:created';

      data = _.pick(data, whitelist);

      contexts
        .create(data)
        .then(function(context) {
          debug('Context created');
          socket.emit(event, null, context.toJSON());
        })
        .catch(function(err) {
          debug('Context creation failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to contexts update event
     * @rest PUT
     */
    'update': function(data) {
      debug('Updating context');
      var event = 'contexts:updated';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, {message: 'No ID provided to context:update' }, null);
      }

      contexts
        .get(data.id)
        .save(data)
        // @todo we also have to check/update the links
        .then(function(context) {
          debug('Context updated');
          socket.emit(event, null, context.toJSON());
        })
        .catch(function(err) {
          debug('Context update failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to contexts patch event
     * @rest PATCH
     */
    'patch': function(data) {
      debug('Patching context');
      var event = 'contexts:patched';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, { message: 'No ID provided to context:update' }, null);
      }

      contexts
        .get(data.id)
        .save(data, { patch: true })
        // @todo we also have to check/update the links
        .then(function(context) {
          debug('Context patched');
          socket.emit('contexts:patched', null, context.toJSON());
        })
        .catch(function(err) {
          debug('Context patch failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to contexts delete event
     * @rest DELETE
     */
    'delete': function(data) {
      debug('Deleting context');
      var event = 'contexts:deleted';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, { message: 'No ID provided to context:update' }, null);
      }

      contexts
        .get(data.id)
        .destroy()
        // @todo we also have to check/update the links
        .then(function(context) {
          debug('Context deleted');
          socket.emit(event, null, context.toJSON());
        })
        .catch(function(err) {
          debug('Context delete failed');
          socket.emit(event, err, null);
        });
    }
  };

  // @todo listen to redis

  //contexts.on('saved', function() {
  // @todo broadcast to redis
  //});

  /**
   * Return a function to provide access to the
   */
  return function(name) {
    return api[name];
  };
};
