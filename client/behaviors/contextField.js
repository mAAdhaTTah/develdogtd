import { Behavior } from 'backbone.marionette';
import _ from 'lodash';
import 'selectize';
import contextChannel from '../channels/context';

export default Behavior.extend({

  /**
   * Renders the context input element
   * into a selectize element
   */
  onRender: function() {
    this.ui.context.selectize({
      valueField: 'id',
      labelField: 'name',
      searchField: ['name'],
      sortField: 'name',
      create: function(input, cb) {
        this.stopListening(contextChannel);
        cb(contextChannel.request('create', { name: input }));
        this.keepOptionsSynced();
      },

      maxItems: 1,
      item: [this.view.model.get('context_id')],
      options: contextChannel.request('list'),
      persist: true,
      closeAfterSelect: true
    });
  },

  /**
   * Listen for new context and add them to the dropdown
   */
  keepOptionsSynced: function() {
    this.listenTo(contextChannel, 'added', function(context) {
      this.ui.context[0].selectize.addOption(context.toJSON());
    });
  },

  /**
   * Binds the change event to update the view's model
   */
  onAttach: function() {
    this.ui.context.on('change', _.bind(this.updateContext, this));
  },

  /**
   * Updates the model with the new context ID
   */
  updateContext: function() {
    this.view.saveModel('context_id', parseInt(this.ui.context.val(), 10));
  },

  /**
   * Destroy the selectize object
   */
  onDestroy: function() {
    this.ui.context[0].selectize.destroy();
  }
});
