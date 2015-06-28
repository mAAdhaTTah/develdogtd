import Backbone from 'backbone';

export default Backbone.Model.extend({

  /**
   * Default attributes
   */
  defaults: {
    name: '',
    imported: false,
    importing: false
  }
});
