var Promise = require('bluebird');
var debug = require('debug')('develdogtd:socket:setup');
var Task = require('../models/task');
var Context = require('../models/context');
var User = require('../models/user');

module.exports = function(socket, next) {

  User
    .where({ id: socket.request.user })
    .fetch({
      withRelated: ['projects', 'contexts', 'actions']
    })
    .then(function(user) {
      debug('Retrieved user data and relations.');
      socket.request.user = user;
      next();
    });

  socket.on('all:reconcile', function() {
    socket.emit('all:reconciled', {
      projects: socket.request.user.related('projects').toJSON(),
      contexts: socket.request.user.related('contexts').toJSON(),
      actions: socket.request.user.related('actions').toJSON(),
      user: socket.request.user.toJSON()
    });
    debug('Reconciled data');
  });
};
