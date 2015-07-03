import { CollectionView } from 'backbone.marionette';
import $ from 'jquery';
import velocity from 'velocity-animate';
import globalChannel from '../channels/global';
import actionChannel from '../channels/action';
import childView from './itemView';

export default CollectionView.extend({

  /**
   * Child view for the collection
   */
  childView,

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
    velocity(view.$el, 'scroll');
    view.ui.name.focus();
  }
});
