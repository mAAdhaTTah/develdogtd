module.exports = Backbone.Model.extend({
  defaults: {
    name: '',
    type: 'project',
    completed: false,
    project_id: null
  }
});
