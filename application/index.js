var AppRouter = require('./router');
var AppView = require('../views/app');
var ActionCollection = require('../collections/action');
var ProjectCollection = require('../collections/project');

var app = Marionette.Application.extend({
  initialize: function() {
    this.view = new AppView();
    this.router = new AppRouter();
    this.actions = new ActionCollection(ddBoot.actions);
    this.projects = new ProjectCollection(ddBoot.projects);
  }
});

module.exports = app;
