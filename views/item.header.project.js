var projectChannel = require('../channels/project');
var globalChannel = require('../channels/global');

module.exports = Marionette.ItemView.extend({
  willRemove: false,

  className: 'project',

  template: require('../templates/header.project.hbs'),

  events: {
    'click .edit-notes': 'toggleNotes',
    'keyup input[name="project-name"]': 'updateName',
    'keyup textarea#project-notes': 'updateNotes',
    'click .project-completed': 'updateCompleted',
  },

  onRender: function() {
    // Grab our jQuery selectors
    this.$name = this.$('input[name="project-name"]');
    this.$notes = this.$('textarea#project-notes').hide();
    this.$project = this.$('.project-project');
    this.$context = this.$('input[name="project-context"]');
    this.$due = this.$('input[name="project-due"]');
    this.$completed = this.$('.project-completed').prop('checked', this.model.get('completed'));

    // Set the correct class for the state
    this.toggleCompleted();
    this.attachListeners();

    return this;
  },

  attachListeners: function() {
    // Bind our events to the model
    this.listenTo(this.model, 'change:completed', this.toggleCompleted);
    this.$project.on('change', _.bind(this.updateProject, this));
  },

  maybeDestroy: function(project_id, context_id) {
    if(this.model.get('completed')) {
      return this.destroy();
    }

    if(project_id === this.model.get('project_id')) {
      return this.destroy();
    }

    // if(context_id === this.model.get('context_id')) {
    //   return this.destroy();
    // }

    return false;
  },

  onBeforeDestroy: function() {
    this.$el.fadeOut();
  },

  toggleNotes: function() {
    this.$notes.slideToggle();
  },

  updateName: function() {
    this.saveModel('name', this.$name.val());
  },

  updateNotes: function() {
    this.saveModel('notes', this.$notes.val());
  },

  updateProject: function() {
    this.saveModel('project_id', parseInt(this.$project.val(), 10));
  },

  updateContext: function() {
    this.saveModel('context', this.$context.val());
  },

  updateDue: function() {
    this.saveModel('due', this.$due.val());
  },

  updateCompleted: function() {
    // this is duplicative but shouldn't be a big deal
    // please remove this when we DRY up these methods
    this.model.set('completed', this.$completed.is(':checked'));
    this.saveModel('completed', this.$completed.is(':checked'));
  },

  saveModel: _.debounce(function(key, value) {
    this.model.save(key, value, {
      error: function(model, response, options) {
        console.log(response);
        var n = noty({
          text: response,
          animation: {
            open: {height: 'toggle'}, // jQuery animate function property object
            close: {height: 'toggle'}, // jQuery animate function property object
            easing: 'swing', // easing
            speed: 500 // opening & closing animation speed
          },
          type: 'error',
          timeout: 3000,
        });
      }
    });
  }, 800),

  toggleCompleted: function() {
    this.model.get('completed') ? this.$el.addClass('completed') : this.$el.removeClass('completed');
  }
});
