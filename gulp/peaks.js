'use strict';

import gulp from 'gulp';
import peaks from '../gulp-peak-builder'

gulp.task('peaks', () => {
  gulp.src(['../cloud/**/*.mp3'])
    .pipe(peaks())
    .pipe(gulp.dest("./hugo/data/peaks"))
        
});
