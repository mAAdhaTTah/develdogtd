import { Application } from 'backbone.marionette';
import Backbone from 'backbone';
import '../shim';

let SettingsRouter = require('./router');

let Settings = Application.extend({

  /**
   * Initialize the settings page
   */
  initialize: function() {
    var router = new SettingsRouter();
  }
});

let settings = new Settings();

// Start history when our application is ready
settings.on('start', function() {
  Backbone.history.start();
});

settings.start();

module.exports = settings;
