import { ItemView } from 'backbone.marionette';

export default ItemView.extend({

  /**
   * Import page class
   */
  className: 'import',

  /**
   * Template for import page
   */
  template: require('../templates/import.hbs')
});
