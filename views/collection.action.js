var globalChannel = require('../channels/global');
var actionChannel = require('../channels/action');

module.exports = Marionette.CollectionView.extend({
  childView: require('./item.action'),
  className: 'perspective-inbox',

  onShow: function() {
    globalChannel.comply('refresh', this.refresh, this);
  },

  filter: function(child, index, collection) {
    if (child.get('completed')) {
      return false;
    }

    if (this.project_id && child.get('project_id') !== this.project_id) {
      return false;
    }

    if (this.context_id && child.get('context_id') !== this.context_id) {
      return false;
    }

    return true;
  },

  refresh: function() {
    this.children.each(function(view) {
      view.maybeDestroy(this.project_id, this.context_id);
    });
  }
});
