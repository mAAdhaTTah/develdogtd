import { ItemView } from 'backbone.marionette';
import template from '../templates/source.hbs';

export default ItemView.extend({

  /**
   * Defines container class
   */
  className: 'source',

  /**
   * Template for import page
   */
  template,

  /**
   * UI elements for sources
   */
  ui: {
    importSource: '.import-source'
  },

  /**
   * Events for the source template
   */
  events: {
    'click @ui.importSource': 'importSource'
  },

  /**
   * Update the button if the project is imported
   */
  onRender() {
    if (this.model.get('imported'))
      this.setImported();
     else {
      this.setNotImported();
    }
  },

  /**
   * Trigger the importing the project
   */
  importSource() {
    this.model.save()
      .done(() => {
        this.setImported();
      })
      .fail((err) => {
        this.setNotImported();
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

  /**
   * Sets the source as imported
   */
  setImported() {
    this.ui.importSource
      .prop('disabled', true)
      .addClass('imported')
      .html('Project Imported');
  },

  /**
   * Sets the source as not yet imported
   */
  setNotImported() {
    this.ui.importSource
      .prop('enabled', true)
      .removeClass('imported')
      .html('Import Project');
  }
});
