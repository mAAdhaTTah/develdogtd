var projectChannel = require('../channels/project');

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  template: require('../templates/list.project.hbs'),

  makeActive: function() {
    this.$el.addClass('active');

    return this;
  }
});
