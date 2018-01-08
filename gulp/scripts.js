'use strict'

import gulp from 'gulp'
import concat from 'gulp-concat'
import rename from 'gulp-rename'
import browserify from 'browserify'
import babelify from 'babelify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import sourcemaps from 'gulp-sourcemaps'
import gutil from 'gulp-util'
import babel from 'gulp-babel'
import hash from 'gulp-hash'
import del from 'del'

const b = browserify({
  entries: `${global.paths.src}/js/main.js`,
  debug: true,
  transform: [
    'browserify-shim',
    babelify.configure({
      presets: ['es2015']
    }),
    'vueify'
  ]
})

// babelify JavaScript files
gulp.task('scripts', () => {
  del([`${global.paths.dist_js}/**/*`])
  return b
    .bundle()
    .on('error', function(error) {
      gutil.log(error.toString())
      this.emit('end')
    })
    .pipe(source(`${global.paths.src}/js/main.js`))
    .pipe(buffer())
    .pipe(concat('main.js'))
    .pipe(hash())
    .pipe(gulp.dest(global.paths.dist_js))
    .pipe(hash.manifest('./hugo/data/cachebust.json'))
    .pipe(gulp.dest('./'))
})
