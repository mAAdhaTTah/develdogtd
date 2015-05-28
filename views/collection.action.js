var globalChannel = require('../channels/global');
var actionChannel = require('../channels/action');

module.exports = Marionette.CollectionView.extend({

  /**
   * Child view for the collection
   */
  childView: require('./item.action'),

  /**
   * Class for the collection container
   */
  className: 'perspective-inbox',

  /**
   * Sets up the view to comply with required commands
   */
  onShow: function() {
    globalChannel.comply('refresh', this.refresh, this);
  },

  /**
   * Removes the children from the view
   */
  refresh: function() {
    this.children.each(function(view) {
      view.maybeDestroy(this.project_id, this.context_id);
    });
  },

  /**
   * Scrolls the window to the new view
   * @param view
   */
  onAddChild: function(view) {
    view.$el.velocity('scroll');
  }
});
