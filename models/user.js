var bookshelf = require('../common/bookshelf');
var Task = require('./task');
var Context = require('./context');

module.exports = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,

  tasks: function() {
    return this.hasMany('Task');
  },

  contexts: function() {
    return this.hasMany('Context');
  }
});
