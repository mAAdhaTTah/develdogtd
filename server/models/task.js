var bookshelf = require('../db/bookshelf');
var User = require('./user');
var Context = require('./context');
var Link = require('./link');
var moment = require('moment');
var validation = require('../../validation').task;

module.exports = bookshelf.model('Task', {

  /**
   * Define task table
   */
  tableName: 'tasks',

  /**
   * Tasks have timestamps
   */
  hasTimestamps: true,

  /**
   * Hidden from client
   */
  hidden: ['user_id'],

  /**
   * Tasks default to incomplete
   */
  defaults: {
    completed: false
  },

  /**
   * Add validation on save
   */
  initialize: function() {
    this.on('saving', this.validateSave);
  },

  /**
   * Run validation on save
   * @returns boolean
   */
  validateSave: function() {
    return validation.run(this.attributes);
  },

  /**
   * Task belongs to a single user
   * @returns {*}
   */
  user: function() {
    return this.belongsTo('User');
  },

  /**
   * Task can only have one context
   * @returns {*}
   */
  context: function() {
    return this.hasOne('Context');
  },

  /**
   * Task can have a single link
   * @returns {*}
   */
  link: function() {
    return this.hasOne('Link');
  },

  /**
   * Enforce task attribute formatting
   *
   * @param attrs
   * @returns {*}
   */
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
