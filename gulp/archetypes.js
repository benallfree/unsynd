'use strict';

import gulp from 'gulp';

gulp.task('archetypes', () => {
    gulp.src(['./src/archetypes/**/*'])
      .pipe(gulp.dest("./hugo/archetypes"))
});

