var gulp = require( 'gulp' )
    , runSequence = require( 'run-sequence' )
    ;

module.exports = function( done ) {
    return runSequence(
        'clean',
        [ 'copy' ],
        [ 'sass', 'browserify' ],
        done
    );
}
