import './../shim';
import { Application } from 'backbone.marionette';
import AppRouter from './router';

export default Application.extend({

  /**
   * Initialize the App router
   */
  initialize: function() {
    let router = new AppRouter();
  }
});
