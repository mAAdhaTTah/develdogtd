var contextChannel = require('../channels/context');

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  template: require('../templates/list.context.hbs'),

  makeActive: function() {
    this.$el.addClass('active');

    return this;
  }
});
