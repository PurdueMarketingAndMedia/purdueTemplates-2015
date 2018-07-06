// require packages
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ifelse = require('gulp-if-else'),

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

    // js
    watchify = require('watchify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    gutil = require('gulp-util'),
    glob = require('glob'),
    es = require('event-stream'),
    uglify = require('gulp-uglify'),
    babelify = require('babelify'),

    //async
    async = require('async'),

    //zip
    gulpZip = require('gulp-zip'),

    // del
    del = require('del');

// set variables
var env,
    componentSources,
    htmlSources,
    templateSources,
    jsSources,
    jsSourcesAll,
    scssSources,
    sassStyle;

// set env
env = process.env.NODE_ENV || 'development';

// set output directories based on env
devOutputDir = 'builds/development';
prodOutputDir = 'builds/production';

// define component sources paths
componentSources = ['components/**/*'];
htmlSources = ['components/html/templates/**/*.html'];
templateSources = ['components/html/modules/**/*.html'];
jsSources = 'components/js/**/+(index)*.js';
jsSourcesAll = 'components/js/**/*.js';
scssSources = ['components/css/**/*.scss'];

function cleanHtml(production = false){
    return new Promise((resolve, reject) => {
        let dir = 'builds/development/templates/**/*';
        production ? dir = 'builds/production/templates/**/*' : null;
        async.series([
            function(next)
            {
                del([
                    dir
                ]);
                next();
            },
            function(next)
            {
                //resolve the promise
                resolve(true);
            }
        ]);
    });
}

function cleanCss(production = false){
    return new Promise((resolve, reject) => {
        let dir = 'builds/development/css/**/*';
        production ? dir = 'builds/production/css/**/*' : null;
        async.series([
            function(next)
            {
                del([
                    dir
                ]);
                next();
            },
            function(next)
            {
                //resolve the promise
                resolve(true);
            }
        ]);
    });
}

// html task
gulp.task('html', function(){
    if (env === 'production') {
        return htmlBuild(true);
    } else { // assume it's the dev environment
        return htmlBuild(false);
    }
});

function htmlBuild(production = false,zip = false){
    //return a promise that resolves when the HTML finishes compiling
    return new Promise((resolve, reject) => {
        async.series([
            function(next)
            {
                let deleteHtml = cleanHtml(true);
                let outputDir = production ? prodOutputDir : devOutputDir;
                deleteHtml.then(
                    () => {
                        //successfully cleaned HTML
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
                        .pipe(gulp.dest(outputDir+'/templates/'))
                        .on('end',next);
                    }
                ).catch(
                    () => {
                        //failed to clean HTML
                });
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
                let deleteCss = cleanCss(production);
                deleteCss.then(
                    () => {
                        //successfully cleaned CSS
                        if(production)
                        { //compile the production CSS
                            gulp.src(scssSources)
                                .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
                                .pipe(postcss([ autoprefixer, pseudoelements ]))
                                .pipe(gulp.dest(prodOutputDir+'/css/'))
                                .on('end',next);
                        }
                        else
                        { //compile the development CSS
                            gulp.src(scssSources)
                                .pipe(sourcemaps.init())
                                .pipe(sass({outputStyle:'expanded'}).on('error',sass.logError))
                                .pipe(sourcemaps.write('./sourcemaps'))
                                .pipe(gulp.dest(devOutputDir+'/css/'))
                                .on('end',next);
                        }
                    }
                ).catch(
                    () => {
                        //failed to clean CSS
                    }
                );
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

// js transpiling and bundling
gulp.task('js', function() {
    glob(jsSources,function (er, files){
        var streams = files.map(function(fileName) {
            // Here we instead create a callback to pass to watchify for its
            // update event.
            var bundler = watchify(browserify(fileName,
            {debug: true})),
            devWatchFn = getWatchifyHandler(bundler,fileName,devOutputDir,false),
            prodWatchFn = getWatchifyHandler(bundler,fileName,prodOutputDir,false);
            bundler.on('update', function(i){
                return es.merge(
                    getWatchifyHandler(bundler,fileName,devOutputDir,false),
                    getWatchifyHandler(bundler,fileName,prodOutputDir,false)
                );
            });
            bundler.on('log', gutil.log); // watchify doesn't log by itself
            //return watchfn(); // run the actual build for the first time
            return es.merge(devWatchFn,prodWatchFn);
        });
        return es.merge(streams);
    });
});
// Create a function that bundles the code and gives it
// the appropriate file name.
function getWatchifyHandler(bundler,fileName,output,minify) {
    var folders = fileName.split("/"),
        outputJsDirectory = output,
        reload = (!minify && env == "development") || (minify && env == "production");

    for (let i = 1; i < folders.length; i++) {
        outputJsDirectory += "/" + folders[i];

        //ignore the name of the file (last item in array)
        if (i == folders.length - 2) {
            break;
        }
    }

    return bundler.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil,'Browserify Error'))
        .pipe(source(folders[folders.length - 1]))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        .pipe(ifelse(minify,
            function(){
                return uglify();
            }
        ))
        // optional, remove if you dont want sourcemaps
        .pipe(ifelse(!minify,
            function(){
                return sourcemaps.init({loadMaps: true});
            }
        ))
        .pipe(ifelse(!minify,
            function(){
                return sourcemaps.write('./sourcemaps/');
            }
        ))
        .pipe(gulp.dest(outputJsDirectory))
        .pipe(ifelse(reload,
            function(){
                return connect.reload();
            }
        ));
}

function bundle(b) {
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil,'Browserify Error'))
        .pipe(source('index.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
           // Add transformation tasks to the pipeline here.
        .transform("babelify", {presets: ["@babel/preset-env"]})
        .pipe(sourcemaps.write('./sourcemaps/')) // writes .map file
        .pipe(gulp.dest(devOutputDir+'./js/'));
}

gulp.task('zip',function(){
    return new Promise((resolve, reject) => {
        let compileHtml = htmlBuild(true,true);
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
                gulp.src('builds/production/**/*')
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
    let outputDir = `${devOutputDir}/`;
    if (env === 'production') {
        outputDir = `${prodOutputDir}/`;
    }
    connect.server({
        root: outputDir,
        livereload: true
    });
});

// default task when 'gulp' is run
gulp.task('default',['html','js','sass','connect','watch']);
