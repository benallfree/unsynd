'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import changed from 'gulp-changed';

gulp.task('images', () => {
  let dest = `${global.paths.dist}/img`;
  gulp.src(global.paths.img)
      .pipe(changed(dest))
      .pipe(imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngquant()]
      }))
      .pipe(gulp.dest(dest));
});
