var Promise = require('bluebird');
var debug = require('debug')('develdogtd:socket:setup');
var Task = require('../models/task');
var Context = require('../models/context');
var User = require('../models/user');

module.exports = function(socket, next) {
  socket.on('all:reconcile', function() {
    socket.emit('all:reconciled', {
      projects: socket.data.projects.toJSON(),
      contexts: socket.data.contexts.toJSON(),
      actions: socket.data.actions.toJSON(),
      user: socket.data.user.toJSON()
    });
    debug('Sent setup data');
  });

  var actions = Task
    .where({
      user_id: socket.request.user,
      completed: false,
      type: 'action'
    })
    .query('orderBy', 'created_at', 'ASC')
    .fetchAll();
  var projects = Task
    .where({
      user_id: socket.request.user,
      completed: false,
      type: 'project'
    })
    .query('orderBy', 'created_at', 'ASC')
    .fetchAll();
  var contexts = Context
    .where({ user_id: socket.request.user })
    .query('orderBy', 'created_at', 'ASC')
    .fetchAll();

  var user = User
    .where({ id: socket.request.user })
    .fetch();

  Promise
    .all([actions, projects, contexts, user])
    .then(function(results) {
      debug('Retrieved setup data');

      socket.data = {
        projects: results[1],
        contexts: results[2],
        actions: results[0],
        user: results[3]
      };

      next();
    });
};
