module.exports = Marionette.Behavior.extend({

  /**
   * Handles the error object when a model doesn't validate
   */
  onRender: function() {
    this.listenTo(this.view.model, 'invalid', this.handleErrors);
  },

  /**
   * Displays the error messages from the error object
   * to the user in a noty notification
   * @param err
   */
  handleErrors: function(err) {
    var error = err.validationError;

    for (var prop in error) {
      if (error.hasOwnProperty(prop)) {
        _.forEach(error[prop], function(msg) {
          noty({
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
        });
      }
    }
  }
});
