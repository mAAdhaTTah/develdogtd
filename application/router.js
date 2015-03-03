var globalChannel = require('../channels/global');

module.exports = Marionette.AppRouter.extend({
  routes: {
    "": "redirectTo",
    "inbox": "inbox",
    "projects": "projects"
  },

  redirectTo: function() {
    this.goto('inbox');
  },

  onRoute: function(name, path, args) {
    // @todo move commands here
  },

  inbox: function() {
    globalChannel.command('route', 'inbox');
  },

  projects: function() {
    globalChannel.command('route', 'projects');
  },

  goto: function(route) {
    this.navigate(route);
    this[route]();
  }
});
