var AppView = require('../views/app');
var actionChannel = require('../channels/action');
var projectChannel = require('../channels/project');

module.exports = Marionette.Object.extend({
  initialize: function() {
    this.view = new AppView();
    this.router = this.options.router;
  },

  redirectTo: function() {
    // @todo remove this and set up a real "home"
    this.goto('inbox');
  },

  inbox: function() {
    this.view.setActive('inbox');

    this.view.main.show(actionChannel.request('view:inbox'));
  },

  projects: function(projectId) {
    this.view.setActive('projects');

    var view = projectChannel.request('view:projects');

    this.view.main.show(view);

    view.setActive(projectId);
  },

  goto: function(route) {
    this.router.navigate(route);
    this[route]();
  }
});
