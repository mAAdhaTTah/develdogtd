var bookshelf = require('../common/bookshelf');
var User = require('./user');
var validation = require('./validation').task;

module.exports = bookshelf.model('Task', {
  tableName: 'tasks',
  hasTimestamps: true,
  hidden: ['user_id', 'created_at', 'updated_at'],
  defaults: {
    completed: false
  },

  initialize: function() {
    this.on('saving', this.validateSave);
  },

  validateSave: function() {
    return validation.run(this.attributes);
  },

  user: function() {
    return this.belongsTo('User');
  },

  format: function(attrs) {
    if(attrs.completed) {
      attrs.completedAt = new Date();
    } else if(attrs.completedAt) {
      attrs.completedAt = null;
    }

    if(attrs.due === '') {
      delete attrs.due;
    }

    return attrs;
  }
});
