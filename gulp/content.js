'use strict';

import gulp from 'gulp';

gulp.task('content', () => {
    gulp.src(['./src/content/**/*'])
      .pipe(gulp.dest("./hugo/content"))
});

