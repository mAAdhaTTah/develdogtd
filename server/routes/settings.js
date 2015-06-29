var express = require('express');
var router = express.Router();
var User = require('../models/user');
var _ = require('lodash');
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
  User.where({
    id: req.user
  }).fetch().then(function(user) {
    res.render('settings', {
      title: 'User Settings - DeveldoGTD',
      user: JSON.stringify(user.toJSON())
    });
  })
});

module.exports = router;
