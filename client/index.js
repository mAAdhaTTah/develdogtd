import './shim';
import Backbone from 'backbone';
import App from './application';

let app = new App();

app.on('start', function() {
  Backbone.history.start();
});

app.start();
