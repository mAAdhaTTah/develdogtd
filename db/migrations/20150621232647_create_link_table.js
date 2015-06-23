'use strict';

exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('links', function (table) {
      table.increments('id').primary();
      table.integer('task_id').references('id').inTable('tasks');
      table.string('source');
      table.string('source_id');
      table.string('source_type');
      table.timestamps();
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
    .dropTable('links')
    .then(function() {
      Promise.resolve();
    })
    .catch(function(err) {
      Promise.reject(err);
    });
};
