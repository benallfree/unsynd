'use strict';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import cssNano from 'gulp-cssnano';
import rename from 'gulp-rename';
import gutil from 'gulp-util';
var 
  hash         = require("gulp-hash"),
  del          = require("del"),
  pug          = require('gulp-pug')
 


// compile SASS with sourcemaps
gulp.task('layouts-pug', () => {
  
    gulp.src(['./src/layouts/**/*.pug'])
      .pipe(pug())
      .pipe(gulp.dest("./hugo/layouts"))


});

gulp.task('layouts-html', () => {
  
    gulp.src(['./src/layouts/**/*.html'])
      .pipe(gulp.dest("./hugo/layouts"))


});

gulp.task('layouts', ['layouts-pug', 'layouts-html']);
