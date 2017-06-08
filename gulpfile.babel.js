'use strict';

import gulp from 'gulp';
import requireDir from 'require-dir';

global.paths = {
    // HTML source files
    'html': './src/*.html',
    // JS source files
    'js': './src/static/js/**/*.js',
    // SASS source files
    'sass': './src/static/scss/**/*.scss',
    // image sources files
    'img': './src/static/img/*',
    // source folder
    'src': './src',
    // source CSS folder
    'css': './src/css',
    // distribution folder
    'dist': './static',
  
    'static': './static',
    'dist_css': './static/css',
    'dist_js': './static/js',
};

requireDir('./gulp', { recurse: false });

gulp.task('default', ['build']);
