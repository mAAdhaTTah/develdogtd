import { ItemView } from 'backbone.marionette';

export default ItemView.extend({

  /**
   * Empty view used when importing is in progress
   */
  template: require('../templates/noSources.hbs')
});
