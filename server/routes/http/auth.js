var express = require('express');
var router = express.Router();
var auth = require('../../middleware/auth')();

router.get('/github', auth.authenticate('github'));

router.get('/github/callback',
  auth.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/app');
  });

module.exports = router;
