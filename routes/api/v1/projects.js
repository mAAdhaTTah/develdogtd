var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var db = require('../../../db');
var _ = require('lodash');

router.route(
    '/'
  ).get(function(req, res) {
    res.json(db()
      .project(req.user)
      .remaining()
      .all());

  }).post(function(req, res) {
    res.json(db()
      .project(req.user)
      .set(req.body)
      .save());

  });

router.route(
    '/:project_id'
  ).get(function(req, res) {
    res.json(db()
      .project(req.user)
      .id(req.params.project_id)
      .one());

  }).put(function(req, res) {
    res.json(db()
      .project(req.user)
      .id(req.params.project_id)
      .set(req.body)
      .save());

  }).delete(function(req, res) {
    res.json(db()
      .project(req.user)
      .id(req.params.project_id)
      .delete());

  });

module.exports = router;
