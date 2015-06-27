var _ = require('lodash');
var Promise = require('bluebird');
var debug = require('../config').debug;
var GitHubAPI = new require('github');
var Link = require('../models/link');
var client = new GitHubAPI({
  version: '3.0.0',
  debug: debug,
  timeout: 5000,
  protocol: 'https',
  headers: {
    'user-agent': 'DeveldoGTD'
  }
});
Promise.promisifyAll(client.repos);
var authed;

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
    getAllRepos: function() {
      return client.repos
        .getAllAsync({
          type: 'all',
          sort: 'updated',
          per_page: 100
        })
        .map(function(repo) {
          return Link
            .forge({
              source: 'github',
              source_id: repo.id
            })
            .fetch()
            .then(function(link) {
              repo.imported = link ? true : false;
              return repo;
            });
        })
        .map(function(repo) {
          return {
            name: repo.name,
            imported: repo.imported,
            source: 'github',
            source_type: 'repository',
            source_id: repo.id
          };
        });
    }
  }
};
