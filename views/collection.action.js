var globalChannel = require('../channels/global');
var actionChannel = require('../channels/action');

module.exports = Marionette.CollectionView.extend({
  childView: require('./item.action'),
  className: 'perspective-inbox',

  onShow: function() {
    globalChannel.comply('refresh', this.refresh, this);
  },

  refresh: function() {
    this.children.each(function(view) {
      view.maybeDestroy(this.project_id, this.context_id);
    });
  }
});
