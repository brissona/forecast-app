/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');

sass.compiler = require('node-sass');

function css () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
};

function javascript () {
  return gulp.src('./js/**/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('./public/js'));
};

gulp.task('css', css);
gulp.task('javascript', javascript);

exports.default = function(done) {
  nodemon({
    script: './bin/www',
    ext: 'js css',
    done: done
  });
  // You can use a single task
  gulp.watch('scss/**/*.scss', css);
  // Or a composed task
  gulp.watch('js/**/*.js', javascript);
};
