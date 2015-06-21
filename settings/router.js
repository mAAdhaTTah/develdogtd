var Controller = require('./controller');

module.exports = Marionette.AppRouter.extend({

  /**
   * Routes managed by controller
   */
  appRoutes: {
    '': 'user',
    'import': 'import',
    'import/:source': 'import'
  },

  /**
   * Initialize the router's controller
   */
  initialize: function() {
    this.controller = new Controller();
  }
});
