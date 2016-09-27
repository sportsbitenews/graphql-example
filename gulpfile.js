// var gulp = require("gulp");
// var babel = require("gulp-babel");
// var concat = require("gulp-concat");

// gulp.task("default", function () {
//   return gulp.src("src/**/*.js")
//     .pipe(sourcemaps.init())
//     .pipe(babel())
//     .pipe(concat("all.js"))
//     .pipe(sourcemaps.write("."))
//     .pipe(gulp.dest("dist"));
// });


var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp = require('gulp');
var rollup = require('gulp-rollup');
var sourcemaps = require("gulp-sourcemaps");
var util = require('gulp-util');

gulp.task('default', function () {
  return gulp.src("src/**/*.js")
    .pipe(rollup({
      entry: './src/index.js'
    }))
    .on('error', util.log)
    .pipe(babel())
    .pipe(concat('all.js'))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('dist'));
});
