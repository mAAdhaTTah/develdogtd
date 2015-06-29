var config = require('../../config');

var knex = require('knex')({
  client: 'pg',
  connection:  process.env.DATABASE_URL || config.db,
  debug: config.debug
});

var Bookshelf = require('bookshelf')(knex);
Bookshelf.plugin('registry');
Bookshelf.plugin('visibility');

module.exports = Bookshelf;
