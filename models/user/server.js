var bookshelf = require('../../common/bookshelf');
var Task = require('../task');
var Context = require('../context/server');

module.exports = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,

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
