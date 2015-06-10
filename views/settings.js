/**
 * Settings page
 */
module.exports = Marionette.LayoutView.extend({

  /**
   * View instantiates against
   */
  el: '.settings',

  /**
   * View does not use a template
   */
  template: false,

  /**
   * Regions for view
   */
  regions: {
    main: '.active-page'
  },

  /**
   * UI hash for view
   */
  ui: {
    nav: '.page-nav'
  },

  /**
   * Set current active navigation page
   * @param perspective
   */
  setActive: function(perspective) {
    if (this.$active) {
      this.$active.removeClass('active');
    }

    this.$active = this.$el.find('#' + perspective).addClass('active');
  }
});
