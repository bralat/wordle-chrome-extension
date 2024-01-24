const gulp = require('gulp');
const clean = require('gulp-clean');
const filter = require('gulp-filter');
const terser = require('gulp-terser');
const rollupTerser = require('@rollup/plugin-terser');
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

gulp.task('set-dest-build', (done) => {
  dest = buildDest
  done()
})
gulp.task('set-dest-dev', (done) => {
  dest = devDest
  done()
})

/**************
 * JAVASCRIPT *
 **************/
gulp.task('dev-js', gulp.series(function() {
  return rollup({
      input: 'src/scripts/index.ts',
      plugins: [rollupTs()],
      output: { sourcemap: true }
    })
    .pipe(source('content.js'))
    .pipe(buffer())
    .pipe(gulp.dest(dest+'/scripts'))
}));
gulp.task('build-js', gulp.series(function() {
  return rollup({
      input: 'src/scripts/index.ts',
      plugins: [rollupTs(), rollupTerser({ mangle: true })],
      output: { format: 'iife'}
    })
    .pipe(source('content.js'))
    .pipe(buffer())
    .pipe(gulp.dest(buildDest+'/scripts'))
}));

/**********
 * IMAGES *
 **********/
 gulp.task('copy-images', gulp.series(function() {
    return gulp
      .src('src/images/*')
      .pipe(gulp.dest(`${dest}/images`))
}));

/**********************
 * COPY MANIFEST FILE *
 **********************/
gulp.task('copy-manifest', gulp.series(function() {
    return gulp
      .src(['src/manifest.json'])
      .pipe(gulp.dest(dest))
}));

/***************
 * COPY ASSETS *
 ***************/
gulp.task('copy-assets', gulp.series(function() {
  return gulp
    .src(['src/assets/*'])
    .pipe(gulp.dest(`${dest}/assets`))
}));

/***************************
 * COPY THIRD-PARTY SCRIPT *
 ***************************/
gulp.task('copy-third-party-scripts', gulp.series(function() {
  return gulp
    .src([
      './node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
    ])
    .pipe(gulp.dest(dest+'/scripts'))
}));

/******************
 * SERVICE WORKER *
 ******************/
gulp.task('service-worker-dev', gulp.series(function() {
  return gulp
    .src('src/background.ts')
    .pipe(tsProject()).js
    .pipe(gulp.dest(dest))
}));
gulp.task('service-worker-build', gulp.series(function() {
  return gulp
    .src('src/background.ts')
    .pipe(tsProject()).js
    .pipe(terser({ mangle: true }))
    .pipe(gulp.dest(dest))
}));

/**********
 * OTHERS *
 **********/
gulp.task('clean', gulp.series(function () {
  return gulp
    .src(`${dest}/*`, { read: false })
    .pipe(clean());
}));
gulp.task('compress', gulp.series(function() {
    return gulp
      .src('build/**/*')
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
  'dev', gulp.series([
    'service-worker-dev',
    'copy-images',
    'copy-manifest',
    'copy-assets',
    'copy-third-party-scripts',
    'dev-js',
  ])
)
gulp.task('watch', gulp.series(function () {
  gulp.watch('src/scripts/**/*.ts', gulp.series(['dev-js']));
  gulp.watch('src/images', gulp.series(['copy-images']));
  gulp.watch('src/manifest.json', gulp.series(['copy-manifest']));
  gulp.watch('src/background.ts', gulp.series(['service-worker-dev']));
}));

/**************
 * MAIN TASKS *
 **************/
// Build for upload to Chrome Web Store
gulp.task('build', gulp.series([
  'set-dest-build',
  'clean',
  'service-worker-build',
  'copy-images',  
  'copy-manifest',
  'copy-assets',
  'copy-third-party-scripts',
  'build-js',
  'compress',
  'clean-build',
]));
// Build for development
gulp.task('default', gulp.series([
  'set-dest-dev',
  'clean',
  'dev',
  'watch'
]));
