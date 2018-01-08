'use strict'

import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'
import changed from 'gulp-changed'
import parallel from 'concurrent-transform'
import os from 'os'
import imageResize from 'gulp-image-resize'
import runSeq from 'run-sequence'

// For scaling: https://www.npmjs.com/package/gulp-image-resize

let imageTasks = ['minimize-images']
gulp.task('minimize-images', function() {
  let dest = global.paths.dest_img
  return gulp
    .src(`${global.paths.img}/**/*.{jpg,png,tiff}`)
    .pipe(changed(dest))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()]
      })
    )
    .pipe(gulp.dest(dest))
})
;[100, 300, 800, 1000, 2000].forEach(function(size) {
  var resizeImageTask = 'crop_' + size
  gulp.task(resizeImageTask, ['minimize-images'], function() {
    let dest = `${global.paths.dest_img}/sized/cropped/${size}`
    return gulp
      .src(`${global.paths.dest_img}/originals/**/*.{jpg,png,tiff}`)
      .pipe(changed(dest))
      .pipe(
        imageResize({
          width: size,
          height: size,
          upscale: true,
          crop: true
        })
      )
      .pipe(
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngquant()]
        })
      )
      .pipe(gulp.dest(dest))
  })
  imageTasks.push(resizeImageTask)

  resizeImageTask = 'aspect_' + size
  gulp.task(resizeImageTask, ['minimize-images'], function() {
    let dest = `${global.paths.dest_img}/sized/aspect/${size}`
    return gulp
      .src(`${global.paths.dest_img}/originals/**/*.{jpg,png,tiff}`)
      .pipe(changed(dest))
      .pipe(
        imageResize({
          width: size,
          height: size,
          upscale: true,
          crop: false
        })
      )
      .pipe(
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngquant()]
        })
      )
      .pipe(gulp.dest(dest))
  })
  imageTasks.push(resizeImageTask)
})

gulp.task('images', done => {
  runSeq(imageTasks, done)
})
