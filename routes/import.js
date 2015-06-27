var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var db = require('../db/index');
var Authorization = require('../models/user/authorization');
var _ = require('lodash');
var github = require('../middleware/github');

router.route('/:source')
  .get(function(req, res) {
    switch (req.params.source) {
      case 'github':
        Authorization
          .forge({
            user_id: req.user,
            auth_source: 'github'
          })
          .fetch({
            require: true
          })
          .then(function(auth) {
            return github({
              auth_key: auth.get('access_token')
            })
              .getAllRepos();
          })
          .then(function(repos) {
            res.json(repos);
          })
          .catch(function(err) {
            res.json(err.message);
          });
        break;
      default:
        res
          .status(501)
          .json({
            error: 'Source not configured'
          });
        break;
    }
  })
  .post(function(req, res) {
    switch(req.params.source) {
      case 'github':
        res
          .status(501)
          .json({
            error: 'Source not configured'
          });
        break;
      default:
        res
          .status(501)
          .json({
            error: 'Source not configured'
          });
    }
  });

module.exports = router;
