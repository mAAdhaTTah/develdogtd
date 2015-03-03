exports.up = function(knex, Promise) {
  knex.schema.createTable('tasks', function (table) {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.integer('parent_id').references('id').inTable('tasks').nullable();
    table.integer('project_id').references('id').inTable('tasks').nullable();
    table.string('name');
    table.string('type');
    table.text('notes');
    table.dateTime('due').nullable();
    table.boolean('completed');
    table.dateTime('completedAt').nullable();
    table.timestamps();
  }).then(function(){
    Promise.resolve();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('tasks').then(function() {
    Promise.resolve();
  });
};
