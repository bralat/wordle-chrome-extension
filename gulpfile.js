const gulp = require('gulp');
const clean = require('gulp-clean');
const filter = require('gulp-filter');
const terser = require('gulp-terser');
const ts = require("gulp-typescript");
const zip = require('gulp-zip');
const tsProject = ts.createProject("tsconfig.json");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const rollup = require('@rollup/stream');
const rollupTs = require('@rollup/plugin-typescript');

const buildDest = 'build';
const devDest = 'dev';
let dest = devDest;

gulp.task('set-dest-build', (done) => { dest = buildDest; done()})
gulp.task('set-dest-dev', (done) => { dest = devDest; done()})

/**************
 * JAVASCRIPT *
 **************/
gulp.task('serve-js', gulp.series(function() {
  return rollup({
      input: 'src/scripts/index.ts',
      plugins: [rollupTs()],
      output: { sourcemap: true }
    })
    .pipe(source('content.js'))
    .pipe(buffer())
    .pipe(gulp.dest(devDest+'/scripts'))
}));
gulp.task('build-js', gulp.series(function() {
  return rollup({
      input: 'src/scripts/index.ts',
      plugins: [rollupTs(), terser({ mangle: true })],
      output: { format: 'iife', sourcemap: true }
    })
    .pipe(source('content.js'))
    .pipe(buffer())
    .pipe(gulp.dest(buildDest+'/scripts'))
}));

/**********
 * IMAGES *
 **********/
 gulp.task('copy-images', gulp.series(function() {
    return gulp.src('src/images/*')
    .pipe(gulp.dest(`${dest}/images`))
}));

/**********************
 * COPY MANIFEST FILE *
 **********************/
gulp.task('copy-manifest', gulp.series(function() {
    return gulp.src(['src/manifest.json'])
    .pipe(gulp.dest(dest))
}));

/***************
 * COPY ASSETS *
 ***************/
 gulp.task('copy-assets', gulp.series(function() {
  return gulp.src(['src/assets/*'])
    .pipe(gulp.dest(`${dest}/assets`))
}));

/***************************
 * COPY THIRD-PARTY SCRIPT *
 ***************************/
gulp.task('copy-third-party-scripts', gulp.series(function() {
  return gulp.src('./node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js')
  .pipe(gulp.dest(dest+'/scripts'))
}));

/******************
 * SERVICE WORKER *
 ******************/
gulp.task('service-worker-serve', gulp.series(function() {
  return gulp.src('src/background.ts')
  .pipe(tsProject()).js
  .pipe(gulp.dest(dest))
}));
gulp.task('service-worker-build', gulp.series(function() {
  return gulp.src('src/background.ts')
  .pipe(tsProject()).js
  .pipe(terser({ mangle: true }))
  .pipe(gulp.dest(dest))
}));

/**********
 * OTHERS *
 **********/
gulp.task('clean', gulp.series(function () {
  return gulp.src(`${dest}/*`, { read: false })
    .pipe(clean());
}));
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
gulp.task(
  'prep-serve', gulp.series([
    'service-worker-serve',
    'copy-images',
    'copy-manifest',
    'copy-assets',
    'copy-third-party-scripts',
    'serve-js',
  ])
)

/**************
 * MAIN TASKS *
 **************/
gulp.task('watch', gulp.series('prep-serve', function () {
  gulp.watch('src/scripts/**/*.ts', gulp.series(['serve-js']));
  gulp.watch('src/images', gulp.series(['copy-images']));
  gulp.watch('src/manifest.json', gulp.series(['copy-manifest']));
  gulp.watch('src/background.ts', gulp.series(['service-worker-serve']));
}));
gulp.task('build', gulp.series([
  'set-dest-build',
  'clean',
  'build-js',
  'copy-images',
  'copy-manifest',
  'copy-assets',
  'copy-third-party-scripts',
  'service-worker-build',
  'compress',
  'clean-build',
]))

// Setting the default function
gulp.task('default', gulp.series(['set-dest-dev', 'clean', 'prep-serve', 'watch']));