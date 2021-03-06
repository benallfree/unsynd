'use strict'

import gulp from 'gulp'
import path from 'path'
import util from 'gulp-util'
import runSeq from 'run-sequence'

function logChanges(event) {
  util.log(
    util.colors.green('File ' + event.type + ': ') +
      util.colors.magenta(path.basename(event.path))
  )
}

// Watch for changes.
gulp.task('watch', ['build'], () => {
  gulp.watch(['src/js/**/*'], ['scripts']).on('change', logChanges)
  gulp.watch(['src/scss/**/*'], ['sass']).on('change', logChanges)
  gulp.watch(['src/img/**/*'], ['images']).on('change', logChanges)
  gulp.watch(['src/layouts/**/*'], ['layouts']).on('change', logChanges)
  gulp.watch(['src/archetypes/**/*'], ['archetypes']).on('change', logChanges)
  gulp.watch(['src/content/**/*'], ['content']).on('change', logChanges)
})
