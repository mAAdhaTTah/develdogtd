var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var _ = require('lodash');
var User = require('../models/user');
var config = require('../../config');

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
  User
    .forge({
      email: profile.emails[0].value // @todo loop through and search for all email addresses associated w/ account
    })
    .fetch({
      require: true,
      withRelated: ['authorizations']
    })
    .catch(function(err) {
      // failed to find the user profile
      // so create a new one
      // @todo make sure it's a "Not Found" error; otherwise, rethrow
      return User
        .forge({
          email: profile.emails[0].value,
          display: profile.displayName
        })
        .save();
    })
    .then(function(user) {
      var auths = user.related('authorizations');
      var auth = auths.findWhere({ auth_source: 'github' });

      // if we have a github source already
      if (auth) {
        var update = {};

        // update all of the attributes that don't match what's in the db
        if (auth.get('access_token') !== accessToken) {
          update.access_token = accessToken;
        }

        if (refreshToken && auth.get('refresh_token') !== refreshToken) {
          update.refresh_token = refreshToken;
        }

        if (!(_.isEqual(profile._json, auth.get('json')))) {
          update.json = profile._json;
        }

        if (!(_.isEmpty(update))) {
          // save the changes
          return auth
            .save(update, {
              patch: true
            })
            .then(function() {
              return done(null, user);
            });
        } else {
          return done(null, user);
        }
      }

      // if we dont' have a source, save a new one
      return auths.create({
        auth_source: 'github',
        user_id: user.id,
        profile_id: profile.id,
        login_id: profile.username,
        access_token: accessToken,
        refresh_token: refreshToken,
        json: profile._json
      }).then(function() {
        return done(null, user);
      });
    });
}
