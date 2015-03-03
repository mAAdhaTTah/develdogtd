var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var db = require('../../../db');
var _ = require('lodash');

router.route(
    '/'
  ).get(function(req, res) {
    res.json(db()
      .action(req.user.id)
      .remaining()
      .all()
      .then(function(actions) {
        return actions.sortBy('created_at');
      })
    );

  }).post(function(req, res) {
    res.json(db()
      .action(req.user.id)
      .set(req.body)
      .save());

  });

router.route(
    '/:action_id'
  ).get(function(req, res) {
    res.json(db()
      .action(req.user.id)
      .id(req.params.action_id)
      .one());

  }).put(function(req, res) {
    res.json(db()
      .action(req.user.id)
      .id(req.params.action_id)
      .set(req.body)
      .save());

  }).delete(function(req, res) {
    res.json(db()
      .action(req.user.id)
      .id(req.params.action_id)
      .delete());

  });

module.exports = router;
