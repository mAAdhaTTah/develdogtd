import { Behavior } from 'backbone.marionette';
import _ from 'lodash';
import 'selectize';
import projectChannel from '../channels/project';

export default Behavior.extend({

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
      create: (input, cb) => {
        this.stopListening(projectChannel);
        cb(projectChannel.request('create', { name: input }));
        this.keepOptionsSynced();
      },
      maxItems: 1,
      item: [this.view.model.get('project_id')],
      options: projectChannel.request('list'),
      persist: true,
      closeAfterSelect: true
    });

    this.keepOptionsSynced();
  },

  /**
   * Listen for new projects and add them to the dropdown
   */
  keepOptionsSynced: function() {
    this.listenTo(projectChannel, 'added', function(project) {
      this.ui.project[0].selectize.addOption(project.toJSON());
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
  },

  /**
   * Destroy the selectize object
   */
  onDestroy: function() {
    this.ui.project[0].selectize.destroy();
  }
});
