import { AppRouter } from 'backbone.marionette';
import Controller from './controller';

export default AppRouter.extend({

  /**
   * Routes managed by controller
   */
  appRoutes: {
    // @todo remove this and set up a real "home"
    '': 'inbox',
    'inbox': 'inbox',
    'projects': 'projects',
    'projects/:project_id': 'projects',
    'contexts': 'contexts',
    'contexts/:context_id': 'contexts'
  },

  /**
   * Initializes the controller
   */
  initialize: function() {
    this.controller = new Controller();
  }
});
