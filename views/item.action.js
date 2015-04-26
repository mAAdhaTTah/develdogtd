var projectChannel = require('../channels/project');
var globalChannel = require('../channels/global');
var moment = require('moment');
var time = require('../config').time;

module.exports = Marionette.ItemView.extend({
  willRemove: false,

  className: 'action',

  template: require('../templates/action.hbs'),

  events: {
    'click .edit-notes': 'toggleNotes',
    'keyup input[name="action-name"]': 'updateName',
    'keyup textarea#action-notes': 'updateNotes',
    'click .action-completed': 'updateCompleted'
  },

  onRender: function() {
    // Grab our jQuery selectors
    this.$name = this.$('input[name="action-name"]');
    this.$notes = this.$('textarea#action-notes').hide();
    this.$project = this.$('.action-project');
    this.$context = this.$('input[name="action-context"]');
    this.$due = this.$('input[name="action-due"]');
    this.$completed = this.$('.action-completed').prop('checked', this.model.get('completed'));

    // Set the correct class for the state
    this.initSelect();
    this.initCalendar();
    this.attachListeners();
    this.toggleClass();

    return this;
  },

  initSelect: function() {
    this.$project.selectize({
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
      item: [this.model.get('project_id')],
      options: projectChannel.request('list'),
      persist: true,
      closeAfterSelect: true
    });
  },

  initCalendar: function() {
    this.$due.datetimepicker({
      onChangeDateTime: _.bind(this.updateDue, this)
    });

    if(this.model.get('due')) {
      this.$due.val(moment(this.model.get('due')).format(time.client));
    }
  },

  attachListeners: function() {
    // Bind our events to the model
    this.listenTo(this.model, 'change', this.toggleClass);
    this.listenTo(this.model, 'invalid', this.handleErrors);
    this.$project.on('change', _.bind(this.updateProject, this));
  },

  toggleClass: function() {
    if(this.model.get('completed')) {
      this.$el.addClass('completed');
    } else {
      this.$el.removeClass('completed');

      // mark as overdue if it's not completed and it's after the due date right now
      if(moment(Date.now()).isAfter(this.model.get('due'))) {
        this.$el.addClass('overdue');
      } else {
       this.$el.removeClass('overdue');
      }
    }
  },

  handleErrors: function(err) {
    var error = err.validationError;
    this.errorMsgs = [];

    for (var prop in error) {
      _.forEach(error[prop], this.displayError, this);
    }
  },

  displayError: function(msg) {
    var n = noty({
      text: msg,
      animation: {
        open: {height: 'toggle'},
        close: {height: 'toggle'},
        easing: 'swing',
        speed: 500
      },
      type: 'error',
      timeout: 3000
    });

    this.errorMsgs.push(n);
  },

  maybeDestroy: function(project_id, context_id) {
    if (this.model.get('completed')) {
      return this.destroy();
    }

    if (project_id === this.model.get('project_id')) {
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
    // this and the next method are required to change the class
    // before the debounced function waits then first
    this.model.set('due', moment(this.$due.val(), time.client).format());
    this.saveModel('due', moment(this.$due.val(), time.client).format());
  },

  updateCompleted: function() {
    // this is duplicative but shouldn't be a big deal
    // please remove this when we DRY up these methods
    this.model.set('completed', this.$completed.is(':checked'));
    this.saveModel('completed', this.$completed.is(':checked'));
  },

  saveModel: _.debounce(function(key, value) {
    this.model.save(key, value).fail(function() {
      globalChannel.command('error');
    });
  }, 800)
});
