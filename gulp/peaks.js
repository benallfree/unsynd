'use strict'

import gulp from 'gulp'
import peakbuilder from 'gulp-wavesurfer-peakbuilder'

gulp.task('peaks', () => {
  gulp
    .src(['../cloud/**/*.mp3'])
    .pipe(peakbuilder())
    .pipe(gulp.dest('./hugo/data/peaks'))
})
