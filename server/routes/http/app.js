var router = require('express').Router();
var Task = require('../../models/task');
var Context = require('../../models/context');
var User = require('../../models/user');
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
  res.render('app', {
    title: 'App - DeveldoGTD'
  });
});

module.exports = router;
