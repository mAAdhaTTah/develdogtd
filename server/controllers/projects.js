var _ = require('lodash');
var debug = require('debug')('develdogtd:controller:projects');

module.exports = function(socket) {
  var projects = socket.request.user.related('projects');
  // @todo maybe move to model itself?
  var whitelist = ['name', 'parent_id'];

  var api = {

    /**
     * Respond to projects read event
     * @rest GET
     */
    'read': function(data) {
      debug('Retrieving project');
      var event = 'projects:returned';

      if (!data.id) {
        return socket.emit(event, null, projects.toJSON());
      }

      var project = projects.get(data.id);

      if (!project) {
        return socket.emit(event, { message: 'No project with provided ID' }, null);
      }

      socket.emit(event, null, project.toJSON());
    },

    /**
     * Respond to projects update event
     * @rest POST
     */
    'create': function(data) {
      debug('Creating project');
      var event = 'projects:created';

      data = _.pick(data, whitelist);
      data.type = 'project';

      projects
        .create(data)
        .then(function(project) {
          debug('Project created');
          socket.emit(event, null, project.toJSON());
        })
        .catch(function(err) {
          debug('Project creation failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to projects update event
     * @rest PUT
     */
    'update': function(data) {
      debug('Updating project');
      var event = 'projects:updated';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, { message: 'No ID provided to project:update' }, null);
      }

      projects
        .get(data.id)
        .save(data)
        // @todo we also have to check/update the links
        .then(function(project) {
          debug('Project updated');
          socket.emit(event, null, project.toJSON());
        })
        .catch(function(err) {
          debug('Project update failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to projects patch event
     * @rest PATCH
     */
    'patch': function(data) {
      debug('Patching project');
      var event = 'projects:patched';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, { message: 'No ID provided to project:update' }, null);
      }

      projects
        .get(data.id)
        .save(data, { patch: true })
        // @todo we also have to check/update the links
        .then(function(project) {
          debug('Project patched');
          socket.emit('projects:patched', null, project.toJSON());
        })
        .catch(function(err) {
          debug('Project patch failed');
          socket.emit(event, err, null);
        });
    },

    /**
     * Respond to projects delete event
     * @rest DELETE
     */
    'delete': function(data) {
      debug('Deleting project');
      var event = 'projects:deleted';

      data = _.pick(data, whitelist.concat('id'));

      if (!data.id) {
        return socket.emit(event, { message: 'No ID provided to project:update' }, null);
      }

      projects
        .get(data.id)
        .destroy()
        // @todo we also have to check/update the links
        .then(function(project) {
          debug('Project deleted');
          socket.emit(event, null, project.toJSON());
        })
        .catch(function(err) {
          debug('Project delete failed');
          socket.emit(event, err, null);
        });
    }
  };

  // @todo listen to redis

  //projects.on('saved', function() {
  // @todo broadcast to redis
  //});

  /**
   * Return a function to provide access to the
   */
  return function(name) {
    return api[name];
  };
};
