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
  del          = require("del")


// compile SASS with sourcemaps
gulp.task('layouts', () => {
  
    gulp.src(['./src/layouts/**/*'])
      .pipe(gulp.dest("./hugo/layouts"))
});
