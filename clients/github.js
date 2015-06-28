var _ = require('lodash');
var Promise = require('bluebird');
var debug = require('../config').debug;
var GitHubAPI = new require('github');
var client = new GitHubAPI({
  version: '3.0.0',
  debug: debug,
  timeout: 5000,
  protocol: 'https',
  headers: {
    'user-agent': 'DeveldoGTD'
  }
});
var authed;

Promise.promisifyAll(client.repos);
Promise.promisifyAll(client.issues);

module.exports = function(opts) {
  if (!opts.auth_key) {
    throw new Error('GitHub requires an auth key');
  } else if (authed !== opts.auth_key) { // alows us to reuse the authentication
    authed = opts.auth_key;

    client.authenticate({
      type: 'oauth',
      token: authed
    });
  }

  return {

    /**
     * Retrieves all the repositories
     * for the authorized user
     *
     * @returns {Promise}
     */
    getAllProjects: function() {
      return client.repos
        .getAllAsync({
          type: 'all',
          sort: 'updated',
          per_page: 100
        })
        .map(function(repo) {
          return {
            name: repo.name,
            source: 'github',
            source_type: 'repository',
            source_id: repo.full_name
          };
        });
    },

    /**
     * Retrieves the information for a given repository
     *
     * source_id param should be the project's full_name
     * e.g. mAAdhaTTah/develdogtd
     *
     * @param source_id
     * @returns {Promise}
     */
    getProject: function(source_id) {
      var params = source_id.split('/');

      return client.repos
        .getAsync({
          user: params[0],
          repo: params[1]
        })
    },

    /**
     * Retrieves the issues for a given repository
     *
     * source_id param should be the project's full_name
     * e.g. mAAdhaTTah/develdogtd
     *
     * @param source_id
     * @returns {Promise}
     */
    getProjectIssues: function(source_id) {
      var params = source_id.split('/');

      return client.issues
        .repoIssuesAsync({
          user: params[0],
          repo: params[1],
          state: 'all',
          per_page: 100
        })

    }
  }
};
