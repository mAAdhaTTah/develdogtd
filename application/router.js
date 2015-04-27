var Controller = require('./controller');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    '': 'redirectTo',
    'inbox': 'inbox',
    'projects': 'projects',
    'projects/:project_id': 'projects',
    'contexts': 'contexts',
    'contexts/:context_id': 'contexts'
  },

  initialize: function() {
    this.controller = new Controller({ router: this });
  }
});
