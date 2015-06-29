import { ItemView } from 'backbone.marionette';

export default ItemView.extend({

  /**
   * User page class
   */
  className: 'user',

  /**
   * Templates for user page
   */
  template: require('../templates/user.hbs')
});
