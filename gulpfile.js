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
    async = require('async'),

    //zip
    gulpZip = require('gulp-zip');

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
    return htmlBuild();
});

function htmlBuild(zip = false){
    //return a promise that resolves when the HTML finishes compiling
    return new Promise((resolve, reject) => {
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
                    // save into respective builds folder
                    .pipe(gulp.dest(outputDir+'templates/'))
                    .on('end',next);
            },
            function(next)
            {
                // reload the page if this was not called by the "zip" task
                !zip ? gulp.src(componentSources).pipe(connect.reload()): null;
                //resolve the promise
                resolve(true);
            }
        ]);
    });
}

// sass task
gulp.task('sass', function(){
    if (env === 'production') {
        return sassBuild(true);
    } else { // assume it's the dev environment
        return sassBuild(false);
    }
});

function sassBuild(production = false,zip = false){
    return new Promise((resolve, reject) => {
        async.series([
            function(next) {
                if(production)
                { //compile the production CSS
                    gulp.src(scssSources)
                        .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
                        .pipe(postcss([ autoprefixer, pseudoelements ]))
                        .pipe(gulp.dest(outputDir+'css/'))
                        .on('end',next);
                }
                else
                { //compile the development CSS
                    gulp.src(scssSources)
                        .pipe(sourcemaps.init())
                        .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
                        .pipe(sourcemaps.write('./sourcemaps'))
                        .pipe(gulp.dest(outputDir+'css/'))
                        .on('end',next);
                }
            },
            function(next) {
                // reload the page if this was not called by the "zip" task
                !zip ? gulp.src(componentSources).pipe(connect.reload()) : null;
                //resolve the promise
                resolve(true);
            }
        ]);
    });
}

gulp.task('zip',function(){
    return new Promise((resolve, reject) => {
        let compileHtml = htmlBuild(true);
        compileHtml.then(
            () => {
                //successfully compiled HTML
                let compileSass = sassBuild(true,true);
                compileSass.then(
                    () => {
                        //successfully compiled SASS
                        let zipFiles = zipBuild();
                        zipFiles.then(
                            () => {
                                //successfully zipped production files
                                resolve(true);
                            }
                        ).catch(
                            () => {
                                //failed to zip production files

                            }
                        );
                    }
                ).catch(
                    ( )=>{
                        //failed to compile SASS
                        console.log('sass failed to compile');
                    }
                );
            }
        ).catch(
            ()=>{
                //failed to compile HTML
            }
        );
    });
});

function zipBuild(){
    return new Promise((resolve,reject) => {
        async.series([
            function(next) {
                gulp.src('builds/production/*')
                    .pipe(gulpZip('vX.X.X.zip'))
                    .pipe(gulp.dest('builds'))
                    .on('end',next);
            },
            function(next) {
                //resolve the promise
                resolve(true);
            }
        ]);
    });
}

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
