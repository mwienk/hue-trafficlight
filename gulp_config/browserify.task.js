var gulp = require( 'gulp' )
    , browserify = require( 'gulp-browserify' )
    , paths = require( './paths.config' )
    , livereload = require( 'gulp-livereload' )
    , uglify = require( 'gulp-uglify' )
    , rename = require( 'gulp-rename' )
    ;

function swallowError ( error ) {
    console.log( error.toString() );
    this.emit( 'end' );
}

module.exports = function( done ) {
    gulp.src( paths.src.js + 'app.js' )
        .pipe( browserify( {
            insertGlobals : false
        } ) )
        .on( 'error', swallowError )
        .pipe( gulp.dest( paths.dist.js ) )
        // .pipe( uglify() )
        .pipe( rename('app.min.js' ) )
        .pipe( gulp.dest( paths.dist.js ) )
        .pipe( livereload() )
        .on( 'end', done );
};
