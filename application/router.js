var Controller = require('./controller');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'redirectTo',
    'inbox': 'inbox',
    'projects': 'projects',
    'projects/:projectId': 'projects'
  },

  initialize: function() {
    this.controller = new Controller({ router: this });
  }
});
