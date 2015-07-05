var _ = require('lodash');
var debug = require('debug')('develdogtd:controller:actions');

module.exports = function(socket) {
  var actions = socket.data.actions;
  // @todo maybe move to model itself?
  var whitelist = ['parent_id', 'project_id', 'context_id', 'name', 'notes', 'due', 'completed', 'completedAt'];

  var api = {

    /**
     * Respond to actions read event
     * @rest GET
     */
    'read': function(data) {
      debug('Retrieving action');
      var event = 'actions:returned';

      if (!data.id) {
        return socket.emit(event, null, socket.data.actions.toJSON());
      }

      var action = socket.data.actions.get(data.id);

      if (!action) {
        return socket.emit(event, { message: 'No action with provided ID' }, null);
      }

      socket.emit(event, null, null, action.toJSON());
    },

    /**
     * Respond to actions update event
     * @rest POST
     */
    'create': function(data) {
      debug('Creating action');
      var event = 'actions:created';

      data = _.pick(data, whitelist);
      data.type = 'action';

      socket.data.actions
        .create(data)
        .then(function(action) {
          debug('Action created');
          socket.emit(event, null, null, action.toJSON());
        })
        .catch(function(err) {
          debug('Action creation failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to actions update event
     * @rest PUT
     */
    'update': function(data) {
      debug('Updating action');
      var event = 'actions:updated';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, { message: 'No ID provided to action:update' }, null);
      }

      socket.data.actions
        .get(data.id)
        .save(data)
        // @todo we also have to check/update the links
        .then(function(action) {
          debug('Action updated');
          socket.emit(event, null, null, action.toJSON());
        })
        .catch(function(err) {
          debug('Action update failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to actions patch event
     * @rest PATCH
     */
    'patch': function(data) {
      debug('Patching action');
      var event = 'actions:patched';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, new Error('No ID provided to action:update'));
      }

      socket.data.actions
        .get(data.id)
        .save(data, { patch: true })
        // @todo we also have to check/update the links
        .then(function(action) {
          debug('Action patched');
          socket.emit('actions:patched', null, null, action.toJSON());
        })
        .catch(function(err) {
          debug('Action patch failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to actions delete event
     * @rest DELETE
     */
    'delete': function(data) {
      debug('Deleting action');
      var event = 'actions:deleted';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, new Error('No ID provided to action:update'));
      }

      socket.data.actions
        .get(data.id)
        .destroy()
        // @todo we also have to check/update the links
        .then(function(action) {
          debug('Action deleted');
          socket.emit(event, null, action.toJSON());
        })
        .catch(function(err) {
          debug('Action delete failed');
          socket.emit(event, err, null);
        });
    }
  };

  // @todo listen to redis

  //actions.on('saved', function() {
  // @todo broadcast to redis
  //});

  /**
   * Return a function to provide access to the
   */
  return function(name) {
    return api[name];
  };
};
