var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var transform = require('vinyl-transform');
var importCss = require('gulp-import-css');

gulp.task('sass', function() {
  return gulp.src('styles/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: require('node-bourbon').with(require('node-neat').includePaths)
    }))
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(importCss())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}));
});

// @todo this is bad, use gulpif
gulp.task('sass-build', function() {
  return gulp.src('styles/main.scss')
    .pipe(sass({
      includePaths: require('node-bourbon').with(require('node-neat').includePaths)
    }))
    .on('error', function(error) {
      console.log(error);
    })
    .pipe(importCss())
    .pipe(gulp.dest('public'))
    .pipe(browserSync.reload({stream: true}));
});

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function(cb) {
  var called = false;
  return nodemon({

    // nodemon our expressjs server
    script: './bin/www',

    // watch core server file(s) that require server restart on change
    watch: ['server.js', '**/*.js']
  })
    .on('start', function onStart() {
      // ensure start only got called once
      if (!called) {
        cb();
      }

      called = true;
    })
    .on('restart', function onRestart() {
      // reload connected browsers after a slight delay
      setTimeout(function reload() {
        browserSync.reload({
          stream: false
        });
      }, BROWSER_SYNC_RELOAD_DELAY);
    });
});

gulp.task('browser-sync', ['nodemon'], function() {

  // for more browser-sync config options: http://www.browsersync.io/docs/options/
  browserSync.init({
    // informs browser-sync to proxy our expressjs app which would run at the following location
    proxy: 'http://localhost:3000',

    // informs browser-sync to use the following port for the proxied app
    // notice that the default port is 3000, which would clash with our expressjs
    port: 4000,

    // open the proxied app in chrome
    browser: ['google chrome']
  });
  gulp.watch('styles/**/*.scss', ['sass']);
});

gulp.task('browserify', function() {
  var bundler = watchify(browserify({
    entries: './client.js',
    debug: true,
    transform: [
      'hbsfy',
      'unreachable-branch-transform'
    ]
  }));

  // on any dep update, runs the bundler
  bundler.on('update', bundle);
  bundle();

  function bundle() {
    return bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source('client.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./public/'))
      .on('finish', browserSync.reload);
  }
});

gulp.task('build', ['sass-build'], function() {
  return browserify({
    entries: './client.js',
    debug: false,
    transform: [
      'hbsfy',
      'unreachable-branch-transform'
    ]
  })
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['sass', 'browser-sync', 'browserify']);
