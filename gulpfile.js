var gulp        = require('gulp');
var uglify      = require('gulp-uglify');
var clean       = require('gulp-clean');
var concat      = require('gulp-concat');
var striplog    = require('gulp-strip-debug');
var minifycss   = require('gulp-minify-css');
var gutil       = require('gulp-util');
var sass        = require('gulp-sass');
var notify      = require("gulp-notify");
var browserSync = require('browser-sync').create();
var jade        = require('gulp-jade');
var js_dest     = 'app/build/';
var gnf         = require('gulp-npm-files');

//var connect     = require('gulp-connect');

//js files
var js_src      = [ 
      'master/js/manifest.js',
      'master/js/modules/**/*.module.js',
      'master/js/modules/**/*.constants.js',
      'master/js/modules/**/*.run.js',
      'master/js/modules/**/*.config.js',
      'master/js/modules/**/*.controller.js',
      'master/js/modules/**/*.directive.js',
      'master/js/modules/**/*.filter.js',
      'master/js/modules/**/*.factory.js',
      'master/js/modules/**/*.provider.js',
      'master/js/modules/**/*.service.js'
];

function buildCore(){
  return gulp.src([
        'node_modules/angular/angular.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-ui-router/release/angular-ui-router.min.js',
        'draweb/manifest.js',
        'draweb/modules/**/*.module.js',
        'draweb/modules/**/*.constants.js',
        'draweb/modules/**/*.run.js',
        'draweb/modules/**/*.config.js',
        'draweb/modules/**/*.controller.js',
        'draweb/modules/**/*.directive.js',
        'draweb/modules/**/*.filter.js',
        'draweb/modules/**/*.factory.js',
        'draweb/modules/**/*.provider.js',
        'draweb/modules/**/*.service.js'
      ])
      .pipe(concat('draweb.js')) // concat all files in the src
      .pipe(striplog())
      .pipe(uglify())           // uglify them all
      .pipe(gulp.dest(js_dest)) // save the file
      .on('error', gutil.log); 
}



gulp.task('scripts', function() {
  // pipe the js through concat, console log stripping, uglification and then store

  return gulp.src(js_src)
      .pipe(concat('app.js')) // concat all files in the src
      //.pipe(striplog())
      .pipe(uglify())           // uglify them all
      .pipe(gulp.dest(js_dest)) // save the file
      .on('error', gutil.log); 
});

gulp.task('scripts-core', function() {
  // pipe the js through concat, console log stripping, uglification and then store
  return buildCore();
});



gulp.task('copyNpmDependenciesAtDifferentFolder', function() {
  return buildCore();
});


gulp.task('templates', function() {
  gulp.src('./master/views/**/*.jade')
    .pipe(jade({
      client: false,
      pretty: true
    }))
    .pipe(gulp.dest('./app/views/'))
});


// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        port: 8080,
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("*.html").on("change", browserSync.reload);
    gulp.watch("app/views/**/*.html").on("change", browserSync.reload);
    gulp.watch(js_dest+"draweb.js").on("change", browserSync.reload);
    gulp.watch(js_dest+"draweb.css").on("change", browserSync.reload);
    gulp.watch(js_dest+"app.js").on("change", browserSync.reload);
    gulp.watch(js_dest+"app.css").on("change", browserSync.reload);

});

gulp.task('css', function() {  
  return gulp.src(['master/sass/*.scss', 'master/css/*.css']) 
      .pipe(sass({style: 'compressed', errLogToConsole: true}))   // Compile sass
      .pipe(concat('app.css'))                                    // Concat all css
      .pipe(minifycss())                                          // Minify the CSS
      .pipe(gulp.dest(js_dest))                                   // Set the destination to assets/css
});

// Clean all builds
gulp.task('clean', function() {
  return gulp.src([js_dest], {read: false})
    .pipe(clean());
});

// web server
/*gulp.task('webserver', function() {
  connect.server();
});*/

// Default task - clean the build dir
// Then rebuild the js and css files

gulp.task('watch', function(){
  gulp.watch([
    'master/sass/*.scss',
    'master/css/*.css'
    ],
    ['css']); // Watch and run sass on changes
  gulp.watch('master/js/**/*.js', ['scripts']); // Watch and run javascripts on changes
  gulp.watch(['draweb/**/*.js', 'draweb/*.js'], ['scripts-core']); // Watch and run javascripts on changes
  gulp.src('master/*')
  .pipe(notify('An master has changed'));
  
});

gulp.task('default', ['clean', 'copyNpmDependenciesAtDifferentFolder', 'css', 'scripts', 'watch','templates', 'browser-sync']);
