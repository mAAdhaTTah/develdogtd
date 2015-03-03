var express = require('express');
var router = express.Router();
var passport = require('../common/passport');

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/app');
});

module.exports = router;
