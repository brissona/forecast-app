/* Gulp should compile sass and make client side JS compatible - feel free to add your own tasks! */

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const nodemon = require('gulp-nodemon');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const del = require('del');
const minify = require('cssnano');
const uglify = require('gulp-uglify');
const optimizeJs = require('gulp-optimize-js');

sass.compiler = require('node-sass');

const clean = () => del(['./public/js', './public/css']);

const css = () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(postcss([ 
      autoprefixer(),
      minify({
        discardComments: {
          removeAll: true
        }
      })
     ]))
    .pipe(gulp.dest('./public/css'));
};

const javascript = () => {
  return gulp.src('./js/**/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(uglify())
    .pipe(optimizeJs())
    .pipe(gulp.dest('./public/js'));
};

const dev = (cb) => {
  nodemon({
    script: './bin/www',
    ext: 'js css twig'
  });

  gulp.watch('scss/**/*.scss', css);

  gulp.watch('js/**/*.js', javascript);

  cb();
};

const build = gulp.series(clean, gulp.parallel(css, javascript));

exports.clean = clean;
exports.css = css;
exports.js = javascript;
exports.dev = dev;
exports.default = build;
