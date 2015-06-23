exports.up = function(knex, Promise) {
  return knex.schema.createTable('authorizations', function(table) {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.string('auth_source').nullable();
    table.string('profile_id').nullable();
    table.string('login_id').nullable();
    table.string('access_token').nullable();
    table.string('refresh_token').nullable();
    table.json('json', true);
    table.timestamps();
  })
    .then(function() {
      return knex('users')
        .select(['id', 'githubId', 'github']);
    })
    .map(function(user) {
      return knex('authorizations')
        .insert({
          user_id: user.id,
          auth_source: 'github',
          profile_id: user.githubId,
          login_id: user.github.login || null,
          json: user.github
        });
    })
    .then(function() {
      return knex.schema.table('users', function(table) {
        table.dropColumn('githubId');
        table.dropColumn('github');
      });
    })
    .then(function() {
      Promise.resolve();
    })
    .catch(function(err) {
      Promise.reject(err);
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('authorizations')
    .then(function() {
      return knex.schema.table('users', function(table) {
        table.integer('githubId').unique().after('id');
        table.json('github', true).after('display');
      });
    })
    .then(function() {
      Promise.resolve();
    })
    .catch(function(err) {
      Promise.reject(err);
    });
};
