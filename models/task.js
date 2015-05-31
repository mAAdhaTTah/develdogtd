var bookshelf = require('../db/bookshelf');
var User = require('./user/server');
var Context = require('./context/server');
var moment = require('moment');
var validation = require('./validation').task;

module.exports = bookshelf.model('Task', {
  tableName: 'tasks',
  hasTimestamps: true,
  hidden: ['user_id'],
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

  context: function() {
    return this.hasOne('Context');
  },

  format: function(attrs) {
    if (attrs.completed) {
      if (!attrs.completedAt) {
        attrs.completedAt = moment(Date.now()).format();
      }
    } else if (attrs.completedAt) {
      attrs.completedAt = null;
    }

    return attrs;
  }
});
