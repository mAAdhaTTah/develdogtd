var bookshelf = require('../db/bookshelf');
var Task = require('./task');

module.exports = bookshelf.model('Link', {

  /**
   * Define link table
   */
  tableName: 'links',

  /**
   * Links have timestamps
   */
  hasTimestamps: true,

  /**
   * Links belong to a single task
   * @returns {*}
   */
  task: function() {
    return this.belongsTo('Task');
  }
});
