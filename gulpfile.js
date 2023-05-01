const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean');
const filter = require('gulp-filter');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const ts = require("gulp-typescript");
const zip = require('gulp-zip');
const tsProject = ts.createProject("tsconfig.json");

const buildDest = 'build';
const devDest = 'dev';
let dest = devDest;

gulp.task('set-dest-build', (done) => { dest = buildDest; done()})
gulp.task('set-dest-dev', (done) => { dest = devDest; done()})

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
  .pipe(tsProject()).js
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
    .pipe(gulp.dest(dest))
}));

/**********************
 * COPY MANIFEST FILE *
 **********************/
 gulp.task('copy-manifest', gulp.series(function() {
    return gulp.src('src/manifest.json')
    .pipe(gulp.dest(dest))
}));

/**********
 * OTHERS *
 **********/
gulp.task('clean', gulp.series(function () {
  return gulp.src(dest, { read: false })
    .pipe(clean());
}));
gulp.task(
  'prep-serve', gulp.series([
    'serve-js',
    'copy-images',
    'copy-manifest',
  ])
)
gulp.task(
  'compress', gulp.series(function() {
    return gulp.src('build/**/*')
    .pipe(zip('build.zip'))
    .pipe(gulp.dest(buildDest))
  })
)
gulp.task(
  'clean-build', gulp.series(function () {
    return gulp
      .src(`${buildDest}/*`)
      .pipe(filter(['*', '!build.zip']))
      .pipe(clean());
}));

/**************
 * MAIN TASKS *
 **************/
gulp.task('watch', gulp.series('prep-serve', function () {
  gulp.watch('src/scripts/**/*.ts', gulp.series(['serve-js']));
  gulp.watch('src/images', gulp.series(['copy-images']));
  gulp.watch('src/manifest.json', gulp.series(['copy-manifest']));
}));
gulp.task('build', gulp.series([
    'set-dest-build',
    'clean',
    'build-js',
    'copy-images',
    'copy-manifest',
    'compress',
    'clean-build'
  ])
)

//Setting the default function
gulp.task('default', gulp.series(['set-dest-dev', 'clean', 'prep-serve', 'watch']));