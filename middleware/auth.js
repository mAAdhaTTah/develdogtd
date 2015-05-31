var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var User = require('../models/user/server');
var config = require('../config');

var opts = {
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackUrl
};

/**
 * Register the required Passport options
 */
passport.use(new GitHubStrategy(opts, verify));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  done(null, id);
});

/**
 * Registers Passport with the app and returns module
 * @param app
 * @returns {Passport}
 */
module.exports = function(app) {
  if (app) {
    app.use(passport.initialize());
    app.use(passport.session());
  }

  return passport;
};

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
