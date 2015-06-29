var Authorization = require('../models/authorization');
var Link = require('../models/link');
var Task = require('../models/task');
var bookshelf = require('../db/bookshelf');
var Promise = require('bluebird');
var _ = require('lodash');
var http = {};
var user = { token: {} };
var sources = ['github'];

module.exports = function(name) {
  var api = {
    show: function() {
      if (_.includes(source(), sources)) {
        getRemoteProjects();
      } else {
        returnSourceNotConfigured();
      }
    },

    update: function() {
      if (_.includes(source(), sources)) {
        importRemoteProject();
      } else {
        returnSourceNotConfigured();
      }
    }
  };

  var getRemoteProjects = function() {
    // Promise continuation
    var cont;

    if (!user.token[source()]) {
      cont = getAuthToken()
        .then(function() {
          return getAllProjects();
        });
    } else {
      cont = getAllProjects();
    }

    cont
      .map(function(repo) {
        return Link
          .forge({
            source: 'github',
            source_id: repo.source_id
          })
          .fetch()
          .then(function(link) {
            repo.imported = link ? true : false;
            return repo;
          });
      })
      .then(function(repos) {
        http.res.json(repos);
      })
      .catch(function(err) {
        http.res.json(err.message);
      });
  };

  var importRemoteProject = function() {
    // Promise continuation
    var cont;

    if (!user.token[source()]) {
      cont = getAuthToken()
        .then(function() {
          return getRemoteProject();
        });
    } else {
      cont = getRemoteProject();
    }

    cont
      .then(function(repo) {
        return getRemoteProjectIssues()
          .then(function(issues) {
            repo.issues = issues;

            return repo;
          })
          .catch(function(err) {
            returnError(err);
          });
      })
      .then(function(repo) {
        return bookshelf.transaction(function(t) {
          return Task
            .forge({
              user_id: user.id,
              name: repo.name,
              type: 'project',
              completed: false
            })
            .save(null, {
              transacting: t
            })
            .tap(function (project) {
              return Link
                .forge({
                  task_id: project.id,
                  source: source(),
                  source_id: repo.full_name,
                  // @todo this may not be correct for other sources
                  source_type: source() === 'github' ? 'repository' : ''
                })
                .save(null, {
                  transacting: t
                });
            })
            .then(function (project) {
              return Promise
                .map(repo.issues, function (issue) {
                  return Task
                    .forge({
                      user_id: user.id,
                      project_id: project.id,
                      name: issue.title,
                      completed: issue.state === 'closed',
                      completedAt: issue.state === 'closed' ? issue.updated_at : null,
                      type: 'action'
                    })
                    .save(null, {
                      transacting: t
                    })
                    .tap(function (action) {
                      return Link
                        .forge({
                          task_id: action.id,
                          source: source(),
                          source_id: issue.id,
                          // @todo this may not be correct for other sources
                          source_type: source() === 'github' ? 'repository' : ''
                        })
                        .save(null, {
                          transacting: t
                        });
                    })
                })
            });
        });
      })
      .then(function(repo) {
        returnResponse(repo);
      })
      .catch(function(err) {
        returnError(err.message);
      });
  };

  var getAuthToken = function() {
    return Authorization
      .forge({
        user_id: user.id,
        auth_source: source()
      })
      .fetch({
        require: true
      })
      .then(function(auth) {
        user.token[source()] = auth.get('access_token');

        return auth;
      });
  };

  var getAllProjects = function () {
    return require('../clients/' + source())({
      auth_key: user.token[source()]
    })
      .getAllProjects();
  };

  var getRemoteProject = function() {
    return require('../clients/' + source())({
      auth_key: user.token[source()]
    })
      .getProject(source_id());
  };

  var getRemoteProjectIssues = function() {
    return require('../clients/' + source())({
      auth_key: user.token[source()]
    })
      .getProjectIssues(source_id());
  };

  var source = function() {
    return http.req.params.source;
  };

  var source_id = function() {
    return http.req.body.source_id;
  };

  var returnResponse = function(resp) {
    http.res.json(resp);
  };

  var returnError = function(msg) {
    http.res
      .status(500)
      .json({
        message: msg
      });
  };

  var returnSourceNotConfigured = function() {
    http.res
      .status(501)
      .json({
        message: 'Source not configured'
      });
  };

  var fire = function(req, res, next, cb) {
    http.req = req;
    http.res = res;
    http.next = next;

    if (user.id !== req.user) {
      user = {
        id: req.user,
        token: {}
      };
    }

    cb();
  };

  return _.partialRight(fire, api[name]);
};
