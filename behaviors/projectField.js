var projectChannel = require('../channels/project');

module.exports = Marionette.Behavior.extend({

  /**
   * Renders the project input element
   * into a selectize element
   */
  onRender: function() {
    this.ui.project.selectize({
      valueField: 'id',
      labelField: 'name',
      searchField: ['name'],
      sortField: 'name',
      create: function(input, cb) {
        $.ajax({
          url: '/api/v1/projects',
          type: 'POST',
          data: {
            name: input
          }
        }).done(function(response) {
          projectChannel.command('add', response);
          cb(response);
        }).fail(function() {
          cb();
        });
      },

      maxItems: 1,
      item: [this.view.model.get('project_id')],
      options: projectChannel.request('list'),
      persist: true,
      closeAfterSelect: true
    });

    this.listenTo(projectChannel, 'added', function(project) {
      this.ui.project.get().selectize.addOption(project.toJSON());
    });
  },

  /**
   * Binds the change event to update the view's model
   */
  onAttach: function() {
    this.ui.project.on('change', _.bind(this.updateProject, this));
  },

  /**
   * Updates the model with the new project ID
   */
  updateProject: function() {
    this.view.saveModel('project_id', parseInt(this.ui.project.val(), 10));
  }
});
