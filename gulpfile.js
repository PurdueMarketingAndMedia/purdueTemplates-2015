// require packages
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

// set variables
var env,
    componentSources,
    htmlSources,
    templateSources,
    scssSources,
    outputDir,
    sassStyle;

// set env
env = process.env.NODE_ENV || 'development';

// set output directories based on env
if (env === 'development') {
    outputDir = 'builds/development/';
} else {
    outputDir = 'builds/production/';
}

// define component sources paths
componentSources = ['components/**/*'],
htmlSources = ['components/html/templates/**/*.html'],
templateSources = ['components/html/modules/**/*.html'],
scssSources = ['components/css/**/*.scss'];

// html task
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
                .pipe(htmlPrettify({
                    indent_char:' ',
                    indent_size:4
                }))
                // save into builds
                .pipe(gulp.dest(outputDir+'templates/'))
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

// sass task
gulp.task('sass', function(){
    async.series([
        function(next) {
            if (env === 'development') {
                gulp.src(scssSources)
                    .pipe(sourcemaps.init())
                    .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
                    .pipe(sourcemaps.write('./sourcemaps'))
                    .pipe(gulp.dest(outputDir+'css/'))
                    .on('end',next);
            } else { // env === production
                gulp.src(scssSources)
                    .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
                    .pipe(postcss([ autoprefixer, pseudoelements ]))
                    .pipe(gulp.dest(outputDir+'css/'))
                    .on('end',next);
            }

        },
        function(next) {
            // reload on any change in components
            gulp.src(componentSources)
                .pipe(connect.reload());
        }
    ]);
});

// watch for changes
gulp.task('watch', function() {
    gulp.watch(htmlSources,['html']);
    gulp.watch(templateSources,['html']);
    gulp.watch(scssSources,['sass']);
});

// local server with live reload
gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

// default task when 'gulp' is run
gulp.task('default',['html','sass','connect','watch']);
