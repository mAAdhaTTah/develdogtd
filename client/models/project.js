import Backbone from 'backbone';

export default Backbone.Model.extend({
  defaults: {
    name: '',
    type: 'project',
    completed: false,
    context_id: null
  }
});
