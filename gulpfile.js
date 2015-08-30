/** Regular npm dependendencies */
var gulp = require('gulp');
var childProcess = require('child_process');
var exec = childProcess.exec;
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');
var del = require('del');
var stylish = require('jshint-stylish');
var nachosOpen = require('nachos-open');

/** Gulp dependencies */
var inject = require('gulp-inject');
var less = require('gulp-less');
var jshint = require('gulp-jshint');
var livereload = require('gulp-livereload');

/** Grab-bag of build configuration. */
var config = {};

/** Reusable functions */

/** Gulp tasks */

gulp.task('default', ['test']);

gulp.task('test', ['jshint']);

gulp.task('jshint', function () {
    gulp.src('./client/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('serve', function (cb) {
    runSequence(
        'clean:tmp',
        'less',
        'inject:css',
        'inject:js',
        'wiredep',
        'livereload',
        ['open',
            'watch'],
        cb);
});

gulp.task('wiredep', function () {
    gulp.src('client/index.html')
        .pipe(wiredep({
            ignorePath: 'client/',
            exclude: [/font-awesome.css/]
        }))
        .pipe(gulp.dest('client'));
});

gulp.task('less', ['inject:less'], function () {
    return gulp.src('client/app/app.less')
        .pipe(less({
            paths: [
                'client/bower_components',
                'client/app',
                'client/components'
            ]
        }))
        .pipe(gulp.dest('client/.tmp/app'));
});

gulp.task('inject:less', function () {
    return gulp.src('client/app/app.less')
        .pipe(inject(gulp.src([
            'client/{app,components}/**/*.less',
            '!client/app/app.less'
        ], {read: false}), {
            transform: function (filePath) {
                filePath = filePath.replace('/client/app/', '');
                filePath = filePath.replace('/client/components/', '');
                return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector'
        }))
        .pipe(gulp.dest('client/app'));
});

gulp.task('inject:css', function () {
    return gulp.src('client/index.html')
        .pipe(inject(gulp.src([
            'client/{app,components}/**/*.css'
        ], {read: false}), {
            transform: function (filePath) {
                filePath = filePath.replace('/client/', '');
                filePath = filePath.replace('/.tmp/', '');
                return '<link rel="stylesheet" href="' + filePath + '">';
            },
            starttag: '<!-- injector:css -->',
            endtag: '<!-- endinjector -->'
        }))
        .pipe(gulp.dest('client'));
});

gulp.task('inject:js', function () {
    return gulp.src('client/index.html')
        .pipe(inject(gulp.src([
            'client/{app,components}/**/*.js',
            '!client/app/app.js',
            '!client/{app,components}/**/*.spec.js',
            '!client/{app,components}/**/*.mock.js'
        ], {read: false}), {
            transform: function (filePath) {
                filePath = filePath.replace('/client/', '');
                return '<script src="' + filePath + '"></script>';
            },
            starttag: '<!-- injector:js -->',
            endtag: '<!-- endinjector -->'
        }))
        .pipe(gulp.dest('client'));
});

gulp.task('watch', function () {
    gulp.watch('client/{app,components}/**/*.less', ['less']);
    gulp.watch('client/{app,components}/**/*.css', ['inject:css']);
    gulp.watch(['client/{app,components}/**/*.js',
        '!client/{app,components}/**/*.spec.js',
        '!client/{app,components}/**/*.mock.js'
    ], ['inject:js']);

    gulp.watch([
            '{.tmp,client}/{app,components}/**/*.css',
            'client/{app,components}/**/*.html',
            'client/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}',
            'client/{app,components}/**/*.js',
            '!client/{app,components}/**/*.spec.js',
            '!client/{app,components}/**/*.mock.js'
        ],
        function (event) {
            livereload.changed(event.path);
        });
});

gulp.task('livereload', function () {
    livereload.listen();
});

gulp.task('clean', ['clean:tmp', 'clean:dist']);

gulp.task('clean:tmp', function (cb) {
    del(['.tmp'], cb);
});

gulp.task('clean:dist', function (cb) {
    del(['dist'], cb);
});

gulp.task('open', function (cb) {
    return nachosOpen('burrito', ['store'])
      .then(function () {
        cb();
        process.exit(1);
      });
});