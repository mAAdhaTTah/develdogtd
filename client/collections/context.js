import { Collection } from 'backbone';
import CollectionView from '../views/collection.context';
import contextChannel from '../channels/context';
import model from '../models/context';

export default Collection.extend({

  /**
   * Default model for the collection`
   */
  model,

  /**
   * Websocket namespace for the collection
   */
  url: 'contexts',

  /**
   * Set up all the event listeners/bindings
   */
  initialize: function() {
    contextChannel.reply('list', this.listContexts, this);
    contextChannel.reply('view:contexts', this.getView, this);
    contextChannel.reply('model:byId', this.get, this);
    contextChannel.comply('add', this.addContext, this);

    this.on('add', function(context) {
      contextChannel.trigger('added', context);
    });
  },

  /**
   * Set up all the event listeners/bindings
   */
  listContexts: function() {
    return this.toJSON();
  },

  /**
   * Get view for the collection
   *
   * @param id
   * @returns {CollectionView}
   */
  getView: function(id) {
    let view = new CollectionView({ collection: this });

    if (id) {
      view.setActive(id);
    }

    return view;
  },

  /**
   * Add a new context to the collection
   * Adds a blank context if none is provided
   *
   * @param context
   */
  addContext: function(context) {
    if(context) {
      this.add(context);
    } else {
      this.add({});
    }
  }
});
