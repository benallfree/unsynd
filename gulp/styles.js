'use strict';

import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import sass from 'gulp-sass';
import gutil from 'gulp-util';
var 
  hash         = require("gulp-hash"),
  del          = require("del")


// compile SASS with sourcemaps
gulp.task('sass', () => {
  del([`${global.paths.dist_css}/**/*`])
    gulp.src(global.paths.sass)
        .pipe(sass()).on('error', function(error) {
            gutil.log(error.toString());
            this.emit('end');
        })
        .pipe(autoprefixer())
        .pipe(hash())
        .pipe(gulp.dest(global.paths.dist_css))
        .pipe(hash.manifest("./hugo/data/cachebust.json"))
        .pipe(gulp.dest("./"))
});
