'use strict'

import gulp from 'gulp'
import pug from 'gulp-pug'
import md from 'gulp-remarkable'
import gutil from 'gulp-util'
import changed from 'gulp-changed'

// compile SASS with sourcemaps
gulp.task('content-pug', () => {
  gulp
    .src(['./src/content/**/*.pug'])
    .pipe(changed('./hugo/content', { extension: '.html' }))
    .pipe(pug().on('error', gutil.log))
    .pipe(gulp.dest('./hugo/content'))
})

gulp.task('content-html', () => {
  gulp
    .src(['./src/content/**/*.html'])
    .pipe(changed('./hugo/content'))
    .pipe(gulp.dest('./hugo/content'))
})

gulp.task('content-md', () => {
  gulp
    .src(['./src/content/**/*.md'])
    .pipe(changed('./hugo/content'))
    .pipe(gulp.dest('./hugo/content'))
})

gulp.task('content', ['content-pug', 'content-html', 'content-md'])
