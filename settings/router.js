import { AppRouter } from 'backbone.marionette';
import Controller from './controller';

export default AppRouter.extend({

  /**
   * Routes managed by controller
   */
  appRoutes: {
    '': 'user',
    'import': 'importing',
    'import/:source': 'importing'
  },

  /**
   * Initialize the router's controller
   */
  initialize: function() {
    this.controller = new Controller();
  }
});
