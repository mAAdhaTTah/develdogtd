require('../application/shim');

var SettingsRouter = require('./router');

var Settings = Marionette.Application.extend({

  /**
   * Initialize the settings page
   */
  initialize: function() {
    var router = new SettingsRouter();
  }
});

var settings = new Settings();

// Start history when our application is ready
settings.on('start', function() {
  Backbone.history.start();
});

settings.start();

module.exports = settings;
