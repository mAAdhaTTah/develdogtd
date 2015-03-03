var bookshelf = require('../common/bookshelf');
var Task = require('./task');

module.exports = bookshelf.model('User', {
  tableName: 'users',
  hasTimestamps: true,

  todos: function() {
    return this.hasMany('Task');
  }
});
