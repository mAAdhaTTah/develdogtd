var SettingsView = require('../views/settings');
var UserView = require('../views/user');
var UserModel = require('../models/user/client');
var ImportView = require('../views/import');
var ImportingView = require('../views/importing');
var SourcesCollection = require('../collections/sources');

module.exports = Marionette.Object.extend({

  /**
   * Initialize the Settings view
   * used by the controller
   */
  initialize: function() {
    this.view = new SettingsView();
  },

  /**
   * Show the user settings view
   */
  user: function() {
    this.view.setActive('user');

    this.view.main.show(new UserView({
      model: new UserModel(ddBoot.user)
    }));
  },

  /**
   * Show the import view
   */
  import: function(source) {
    var view;

    this.view.setActive('import');

    if (source) {
      var sources = new SourcesCollection(null, {
        source: source
      });

      view = new ImportingView({
        collection: sources
      })
    } else {
      view = new ImportView();
    }

    this.view.main.show(view);
  }
});
