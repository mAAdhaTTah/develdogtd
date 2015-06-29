import { Behavior } from 'backbone.marionette';

export default Behavior.extend({

  /**
   * Events hash for this behavior
   */
  events: {
    'click @ui.notesedit': 'toggleNotes',
    'keyup @ui.notesfield': 'updateNotes'
  },

  /**
   * Sets the proper completed class for the item
   */
  onRender: function() {
    this.ui.notesfield.hide();
  },

  /**
   * Toggles display of the notes field
   */
  toggleNotes: function() {
    this.ui.notesfield.slideToggle().focus();
  },

  /**
   * Updates the notes property on the model
   */
  updateNotes: function() {
    this.view.saveModel('notes', this.ui.notesfield.val());
  }
});
