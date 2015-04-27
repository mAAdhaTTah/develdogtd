var AppView = require('../views/app');
var actionChannel = require('../channels/action');
var projectChannel = require('../channels/project');
var contextChannel = require('../channels/context');

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

  projects: function(project_id) {
    this.view.setActive('projects');

    var view = projectChannel.request('view:projects');

    this.view.main.show(view);

    if (project_id) {
      view.setActive(project_id);
    }
  },

  contexts: function(context_id) {
    this.view.setActive('contexts');

    var view = contextChannel.request('view:contexts');

    this.view.main.show(view);

    if (context_id) {
      view.setActive(context_id);
    }
  },

  goto: function(route) {
    this.router.navigate(route);
    this[route]();
  }
});
