var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/user/server');
var config = require('../config');

var opts = {
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackUrl
};

passport.use(new GitHubStrategy(opts, verify));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.forge({
      id: id
    }).fetch({
      require: true
    }).then(function(model) {
      done(null, model);
    }).catch(function(err) {
      done(err, null);
    });
});

module.exports = passport;

function verify(accessToken, refreshToken, profile, done) {
  User.forge({
      githubId: profile.id
    }).fetch({ require: true })
    .then(function(model) {
      return done(null, model);
    }).catch(function(err) {
      // failed to find the user profile
      // so create a new one
      return User.forge({
        githubId: profile.id,
        email: profile.emails.shift().value,
        display: profile.displayName,
        github: profile._json
      }).save().then(function(model, err) {
        return done(err, model);
      });
    });
}
