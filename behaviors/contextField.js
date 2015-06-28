var contextChannel = require('../channels/context');

module.exports = Marionette.Behavior.extend({

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
        $.ajax({
          url: '/api/v1/contexts',
          type: 'POST',
          data: {
            name: input
          }
        }).done(function(response) {
          contextChannel.command('add', response);
          cb(response);
        }).fail(function() {
          cb();
        });
      },

      maxItems: 1,
      item: [this.view.model.get('context_id')],
      options: contextChannel.request('list'),
      persist: true,
      closeAfterSelect: true
    });

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
