import { ItemView } from 'backbone.marionette';

export default ItemView.extend({

  /**
   * Defines container class
   */
  className: 'source',

  /**
   * Template for import page
   */
  template: require('../templates/source.hbs'),

  /**
   * UI elements for sources
   */
  ui: {
    import: '.import-source'
  },

  /**
   * Events for the source template
   */
  events: {
    'click @ui.import': 'importProject'
  },

  /**
   * Update the button if the project is imported
   */
  onRender: function () {
    if (this.model.get('imported'))
    this.setImported();
     else {
      this.setNotImported();
    }
  },

  /**
   * Trigger the importing the project
   */
  importProject: function () {
    let setImported = _.bind(this.setImported, this);
    let setNotImported = _.bind(this.setNotImported, this);

    this.model.save()
      .done(function() {
        setImported();
      })
      .fail(function(err) {
        setNotImported();
        noty({
          text: err.statusText,
          animation: {
            open: {height: 'toggle'},
            close: {height: 'toggle'},
            easing: 'swing',
            speed: 500
          },
          type: 'error',
          timeout: 3000
        });
      });
  },

  setImported: function() {
    this.ui.import
      .prop('disabled', true)
      .addClass('imported')
      .html('Project Imported');
  },

  setNotImported: function() {
    this.ui.import
      .prop('enabled', true)
      .removeClass('imported')
      .html('Import Project');
  }
});
