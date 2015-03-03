var express = require('express');
var router = express.Router();
var db = require('../db');
var _ = require('lodash');

router.use(function(req, res, next) {
  if(!req.user) {
    return res.redirect('/login');
  }

  next();
});

router.get('/', function(req, res) {
  var ddBoot = {};

  db().action(req.user.id).remaining().all().then(function(actions) {
    ddBoot.actions = _.sortByAll(actions.toJSON(), 'created_at');

    return db().project(req.user.id).remaining().all();
  }).then(function(projects) {
    ddBoot.projects = projects.toJSON();

    res.render('app', {
      title: 'App - DeveldoGTD',
      actions: JSON.stringify(ddBoot.actions),
      projects: JSON.stringify(ddBoot.projects)
    });

  });
});

module.exports = router;
