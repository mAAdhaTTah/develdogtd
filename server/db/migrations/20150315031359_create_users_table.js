exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id').primary();
      table.integer('githubId').unique();
      table.string('email');
      table.string('display');
      table.json('github', true);
      table.timestamps();
    })
    .then(function() {
      Promise.resolve();
    })
    .catch(function(err) {
      console.error(err);
      Promise.reject();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('users')
    .then(function() {
      Promise.resolve();
    })
    .catch(function(err) {
      Promise.reject(err);
    });
};
