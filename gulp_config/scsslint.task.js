var   gulp = require( 'gulp' )
    , scsslint = require( 'gulp-scss-lint' )
    , paths = require( '../package.json' ).paths
    ;


module.exports = function( done ) {

    gulp.src( paths.src.scss + '**' )
        .pipe( scsslint() )
        .on( "end", done );

}
