var globalChannel = require('../channels/global');
var actionChannel = require('../channels/action');
var projectChannel = require('../channels/project');

module.exports = Marionette.LayoutView.extend({
  el: '.app',
  template: false,
  regions: {
    header: '.header',
    main: '.main'
  },

  initialize: function() {
    this.$nav = this.$('.navigation');
    this.$addAction = this.$('#add-action');
    this.$refresh = this.$('#refresh');

    this.$addAction.click(this.addAction);
    this.$refresh.click(this.refresh);

    globalChannel.comply('route', this.route, this);
  },

  addAction: function() {
    actionChannel.command('add');
  },

  refresh: function() {
    globalChannel.command('refresh');
  },

  route: function(route) {
    if(this.$active) {
      this.$active.removeClass('active');
    }

    this.$active = this.$nav.find('#' + route).addClass('active');

    this[route]();
  },

  inbox: function() {
    this.main.show(actionChannel.request('view:inbox'));
  },

  projects: function() {
    this.main.show(projectChannel.request('view:projects'));
  }
});
