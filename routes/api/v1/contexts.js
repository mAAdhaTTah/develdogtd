var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var db = require('../../../db');
var _ = require('lodash');
var debug = require('debug')('develdogtd:router');

router.route(
    '/'
  ).get(function(req, res) {
    res.json(db()
      .context(req.user.id)
      .all());

  }).post(function(req, res) {
    debug(req.body);
    res.json(db()
      .context(req.user.id)
      .set(req.body)
      .save());

  });

router.route(
    '/:context_id'
  ).get(function(req, res) {
    res.json(db()
      .context(req.user.id)
      .id(req.params.context_id)
      .one());

  }).put(function(req, res) {
    res.json(db()
      .context(req.user.id)
      .id(req.params.context_id)
      .set(req.body)
      .save());

  }).delete(function(req, res) {
    res.json(db()
      .context(req.user.id)
      .id(req.params.context_id)
      .delete());

  });

module.exports = router;
