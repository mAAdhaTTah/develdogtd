var path = require('path');
var exphbs  = require('express-handlebars');

var hbs = exphbs.create({
  extname: '.hbs',
  layoutsDir: path.join(path.dirname(__dirname), 'templates/layouts/'),
  partialsDir: {
    dir: path.join(path.dirname(__dirname), 'templates/partials/')
  },
  defaultLayout: 'main.hbs'
});

/**
 * Set up the handlebars view engine
 * @param app
 */
module.exports = function(app) {
  app.engine('.hbs', hbs.engine);
  app.set('views', path.join(path.dirname(__dirname), 'templates'));
  app.set('view engine', '.hbs');
};
