var AppRouter = require('./router');
var Controller = require('./controller');
var ActionCollection = require('../collections/action');
var ProjectCollection = require('../collections/project');

var app = Marionette.Application.extend({
  initialize: function() {
    var router = new AppRouter();
    var actions = new ActionCollection(ddBoot.actions);
    var projects = new ProjectCollection(ddBoot.projects);
  }
});

module.exports = app;
