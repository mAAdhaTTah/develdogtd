import Marionette from 'backbone.marionette';
import SettingsView from '../views/settings';
import UserView from '../views/user';
import UserModel from '../models/user';
import ImportView from '../views/import';
import ImportingView from '../views/importing';
import SourcesCollection from '../collections/sources';

export default Marionette.Object.extend({

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
  importing: function(source) {
    let view;

    this.view.setActive('import');

    if (source) {
      let sources = new SourcesCollection(null, {
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
