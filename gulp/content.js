'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug'


// compile SASS with sourcemaps
gulp.task('content-pug', () => {
  
    gulp.src(['./src/content/**/*.pug'])
      .pipe(pug())
      .pipe(gulp.dest("./hugo/content"))


});

gulp.task('content-html', () => {
  
    gulp.src(['./src/content/**/*.html'])
      .pipe(gulp.dest("./hugo/content"))


});

gulp.task('content', ['content-pug', 'content-html']);
