'use strict'

import gulp from 'gulp'
import autoprefixer from 'gulp-autoprefixer'
import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import rename from 'gulp-rename'
import gutil from 'gulp-util'
import changed from 'gulp-changed'
var notify = require('gulp-notify')

var hash = require('gulp-hash'),
  del = require('del'),
  pug = require('gulp-pug')

// compile SASS with sourcemaps
gulp.task('layouts-pug', () => {
  gulp
    .src(['./src/layouts/**/*.pug'])
    .pipe(changed('./hugo/layouts', { extension: '.html' }))
    .pipe(
      pug().on('error', msg => {
        gutil.log(msg)
        notify(msg)
      })
    )
    .pipe(gulp.dest('./hugo/layouts'))
})

gulp.task('layouts-html', () => {
  gulp
    .src(['./src/layouts/**/*.html'])
    .pipe(changed('./hugo/layouts'))
    .pipe(gulp.dest('./hugo/layouts'))
})

gulp.task('layouts', ['layouts-pug', 'layouts-html'])
