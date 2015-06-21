var express = require('express');
var router = express.Router();
var HttpStatus = require('http-status-codes');
var db = require('../../../db');
var Authorization = require('../../../models/user/authorization');
var _ = require('lodash');

router.route(
  '/:source'
).get(function(req, res) {
    var source = req.params.source;

    switch (source) {
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
            return require('../../../middleware/github')({
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
        res.json({
          error: 'Source not configured'
        });
        break;
    }
  });

module.exports = router;
