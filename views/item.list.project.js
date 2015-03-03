var projectChannel = require('../channels/project');

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  template: _.template('<%- name %>'),
  events: {
    'click': 'triggerClick'
  },

  onRender: function() {
    this.on('click', this.triggerClick, this);
  },

  triggerClick: function() {
    this.trigger('actions:show');
  },

  makeActive: function() {
    this.$el.addClass('active');

    return this;
  },

  makeInactive: function() {
    this.$el.removeClass('active');

    return this;
  }
});
