require('./shim');

var AppRouter = require('./router');
var ActionCollection = require('../collections/action');
var ProjectCollection = require('../collections/project');
var ContextCollection = require('../collections/context');

var Application = Marionette.Application.extend({

  /**
   * Initialize the Application componenets
   */
  initialize: function() {
    var router = new AppRouter();
    var actions = new ActionCollection(ddBoot.actions);
    var projects = new ProjectCollection(ddBoot.projects);
    var contexts = new ContextCollection(ddBoot.contexts);
  }
});

module.exports = new Application()
  .on('start', function() {
    Backbone.history.start();
  })
  .start();
