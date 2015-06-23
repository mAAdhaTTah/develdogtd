var router = require('express').Router();
var Task = require('../models/task');
var Context = require('../models/context/server');
var Promise = require('bluebird');

/**
 * Middleware to protect app route
 */
router.use(function(req, res, next) {
  if(!req.user) {
    return res.redirect('/login');
  }

  next();
});

/**
 * GET request on app route
 */
router.get('/', function(req, res) {
  var tasks = Task
    .where({
      user_id: req.user,
      completed: false
    })
    .query('orderBy', 'created_at', 'ASC')
    .fetchAll();
  var contexts = Context
    .where({ user_id: req.user})
    .query('orderBy', 'created_at', 'ASC')
    .fetchAll();

  Promise.all([tasks, contexts]).then(function(results) {
    var tasks = results[0];
    var contexts = results[1].toJSON();

    var actions = tasks.where({ type: 'action' });
    var projects = tasks.where({ type: 'project' });

    res.render('app', {
      title: 'App - DeveldoGTD',
      actions: JSON.stringify(actions),
      projects: JSON.stringify(projects),
      contexts: JSON.stringify(contexts)
    });
  });
});

module.exports = router;
