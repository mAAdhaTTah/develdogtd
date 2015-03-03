exports.up = function(knex, Promise) {
  knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.integer('githubId').unique();
    table.string('email');
    table.string('display');
    table.json('github', true);
    table.timestamps();
  }).then(function() {
    Promise.resolve();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('users').then(function() {
    Promise.resolve();
  });
};
