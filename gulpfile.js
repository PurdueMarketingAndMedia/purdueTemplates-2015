// Include gulp and gulp
var gulp = require('gulp'),
    // enable live reload
    connect = require('gulp-connect'),

    // html
    fileinclude = require('gulp-file-include'),
    htmlPrettify = require('gulp-html-prettify'),

    // css/sass
	sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    pseudoelements = require('postcss-pseudoelements'), // change double :: to single :
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),

    //async
    async = require('async');

// output directories
var devOutputDir = 'builds/development/',
    prodOutputDir = 'builds/production/';

// component sources
var componentSources = ['components/**/*'],
    htmlSources = ['components/html/templates/**/*.html'],
    templateSources = ['components/html/modules/**/*.html'],
    scssSources = ['components/css/**/*.scss'];

// HTML task
gulp.task('html', function(){
    async.series([
        function(next)
        {
            gulp.src(htmlSources)
                // include module files
                .pipe(fileinclude({
                  prefix: '@@',
                  basepath: '@file'
                }))
                // clean up html
                .pipe(htmlPrettify({indent_char:' ',indent_size:4}))
                // save into dev and prod
                .pipe(gulp.dest(devOutputDir+'templates/'))
                .pipe(gulp.dest(prodOutputDir+'templates/'))
                .on('end',next);
        },
        function(next)
        {
            // reload on any change in components
            gulp.src(componentSources)
                .pipe(connect.reload());
        }
    ]);
});

// SASS task
gulp.task('sass', function(){
    async.series([ //development build functions
        function(next)
        {  // dev builds
            gulp.src(scssSources)
                .pipe(sourcemaps.init())
                .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
                .pipe(postcss([ autoprefixer, pseudoelements ]))
                .pipe(sourcemaps.write('./sourcemaps'))
                // save in dev
                .pipe(gulp.dest(devOutputDir+'css/'))
                .on('end',next);
        },
        function(next)
        {  // prod builds
            gulp.src(scssSources)
                .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
                .pipe(postcss([ autoprefixer, pseudoelements ]))
                // save in prod
                .pipe(gulp.dest(prodOutputDir+'css/'))
                .on('end',next);
        },
        function(next)
        {
            // reload on any change in components
            gulp.src(componentSources)
                .pipe(connect.reload());
        }
    ]);
});

gulp.task('watch', function() {
    gulp.watch(htmlSources,['html']);
    gulp.watch(templateSources,['html']);
    gulp.watch(scssSources,['sass']);
});

gulp.task('connect', function() {
    connect.server({
        root: devOutputDir,
        livereload: true
    });
});

gulp.task('default',['html','sass','connect','watch']);
