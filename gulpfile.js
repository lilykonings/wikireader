var gulp = require('gulp');

var cache           = require('gulp-cache');
var clean           = require('gulp-clean');
var concat          = require('gulp-concat');
var imagemin        = require('gulp-imagemin');
var jshint          = require('gulp-jshint');
var minifycss       = require('gulp-minify-css');
var plumber         = require('gulp-plumber');
var rename          = require('gulp-rename');
var sass            = require('gulp-sass');
var stylish         = require('jshint-stylish');
var uglify          = require('gulp-uglify');
var declare         = require('gulp-declare');
var shell           = require('gulp-shell');

gulp.task('styles', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function(){
  return gulp.src('src/js/*.js')
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

//Watch task
gulp.task('watch', function(){
  gulp.watch('src/scss/*.scss', ['styles']);
  gulp.watch('src/js/*.js', ['scripts']);
});

gulp.task('default', ['styles', 'scripts', 'watch'], function(){
  console.log('waiting...');
});
