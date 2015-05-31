var bookshelf = require('../../db/bookshelf');
var Task = require('../task');
var Context = require('../context/server');

module.exports = bookshelf.model('User', {

  /**
   * Define User table
   */
  tableName: 'users',

  /**
   * User has timestamps
   */
  hasTimestamps: true,

  /**
   * User can have many tasks
   * @returns {*}
   */
  tasks: function() {
    return this.hasMany('Task');
  },

  /**
   * User can have many contexts
   * @returns {*}
   */
  contexts: function() {
    return this.hasMany('Context');
  }
});
