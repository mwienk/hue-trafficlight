var gulp = require( 'gulp' ),
    paths = require( './paths.config' ),
    jshint = require( 'gulp-jshint' );

function swallowError ( error ) {
    console.log( error.toString() );
    this.emit( 'end' );
}

module.exports = function() {
    return gulp.src( paths.src.js )
        .pipe( jshint() )
        .on( 'error', swallowError )
}
