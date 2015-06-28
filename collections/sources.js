import Backbone from 'backbone';

export default Backbone.Collection.extend({

  /**
   * Define collection's model
   */
  model: require('../models/source'),

  /**
   * Initialize the collection's source
   *
   * @param atts
   * @param opts
   */
  initialize: function(atts, opts) {
    // Collection should not be initialized with any models
    if (atts) {
      this.reset();
    }

    if (!opts.source) {
      throw new Error('SourcesCollection must be initialized with a source');
    }

    this.url = '/import/' + opts.source;
  }
});
