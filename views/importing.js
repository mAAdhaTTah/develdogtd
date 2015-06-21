module.exports = Marionette.CollectionView.extend({

  /**
   * Defines child views
   */
  childView: require('./source'),

  /**
   * Defines view while importing (no sources yet)
   */
  emptyView: require('./noSources'),

  /**
   * Defines container class
   */
  className: 'importing',

  /**
   * Starts the fetching process
   * after the blank view is rendered
   */
  onRender: function() {
    this.collection.fetch();
  }
});
