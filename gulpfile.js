const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

const buildDest = 'build';
const devDest = 'dev';

/**************
 * JAVASCRIPT *
 **************/
gulp.task('serve-js', gulp.series(function() {
    return gulp.src('src/**/*.ts')
    .pipe(tsProject()).js
    .pipe(sourcemaps.init())
    .pipe(concat('content.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(devDest+'/scripts'))
}));
gulp.task('build-js', gulp.series(function() {
  return gulp.src('src/**/*.ts')
  .pipe(concat('content.js'))
  .pipe(terser({ mangle: true }))
  .pipe(gulp.dest(buildDest+'/scripts'))
  // include step to zip content
}));

/**********
 * IMAGES *
 **********/
 gulp.task('copy-images', gulp.series(function() {
    return gulp.src('src/images')
    .pipe(gulp.dest(devDest))
}));

/**********************
 * COPY MANIFEST FILE *
 **********************/
 gulp.task('copy-manifest', gulp.series(function() {
    return gulp.src('src/manifest.json')
    .pipe(gulp.dest(devDest))
}));

/**********
 * OTHERS *
 **********/
gulp.task('clean-dev', gulp.series(function () {
  return gulp.src(devDest, { read: false })
    .pipe(clean());
}));
gulp.task('clean-build', gulp.series(function () {
  return gulp.src(devDest, { read: false })
    .pipe(clean());
}));
gulp.task(
  'prep-serve', gulp.series([
    'serve-js',
    'copy-images',
    'copy-manifest',
  ])
)

/**************
 * MAIN TASKS *
 **************/
gulp.task('watch', gulp.series('prep-serve', function () {
  gulp.watch('src/scripts/**/*.ts', gulp.series(['serve-js']));
  gulp.watch('src/images', gulp.series(['copy-images']));
  gulp.watch('src/manifest.json', gulp.series(['copy-manifest']));
}));
gulp.task(
  'build', gulp.series([
    'build-js',
    'copy-images',
    'copy-manifest',
  ])
)

//Setting the default function
gulp.task('default', gulp.series(['clean-dev', 'prep-serve', 'watch']));