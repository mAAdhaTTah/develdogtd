var bookshelf = require('../db/bookshelf');
var Task = require('./task');
var Context = require('./context');
var Authorization = require('./authorization');

module.exports = bookshelf.model('User', {

  /**
   * Define User table
   */
  tableName: 'users',

  /**
   * Hide properties from client
   */
  hidden: ['id', 'created_at', 'updated_at'],

  /**
   * User has timestamps
   */
  hasTimestamps: true,

  /**
   * User can have many authorizations
   *
   * @returns {*}
   */
  authorizations: function() {
    return this.hasMany('Authorization');
  },

  /**
   * User can have many tasks of type 'action'
   *
   * @returns {*}
   */
  actions: function() {
    return this.hasMany('Task').query({ where: { type: 'action' }});
  },

  /**
   * User can have many tasks of type 'project'
   *
   * @returns {*}
   */
  projects: function() {
    return this.hasMany('Task').query({ where: { type: 'project' }})
  },

  /**
   * User can have many contexts
   * @returns {*}
   */
  contexts: function() {
    return this.hasMany('Context');
  }
});
