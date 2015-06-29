exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('contexts', function (table) {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users');
      table.integer('parent_id').references('id').inTable('contexts').nullable();
      table.string('name');
      table.timestamps();
    })
    .then(function() {
      return knex.schema
        .table('tasks', function(table) {
          table.integer('context_id').references('id').inTable('contexts').nullable();
        });
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
    .table('tasks', function(table) {
      table.dropColumn('context_id');
    })
    .then(function() {
      return knex.schema.dropTable('contexts');
    })
    .then(function () {
      Promise.resolve();
    })
    .catch(function(err) {
      console.error(err);
      Promise.reject();
    });
  };
