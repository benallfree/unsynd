'use strict'

import gulp from 'gulp'
import runSeq from 'run-sequence'

gulp.task('build', done => {
  runSeq(
    'clean',
    ['scripts', 'sass', 'images', 'layouts', 'archetypes', 'content'],
    done
  )
})
