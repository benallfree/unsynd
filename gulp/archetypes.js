'use strict'

import gulp from 'gulp'
import changed from 'gulp-changed'

gulp.task('archetypes', () => {
  gulp
    .src(['./src/archetypes/**/*'])
    .pipe(changed('./hugo/archetypes'))
    .pipe(gulp.dest('./hugo/archetypes'))
})
