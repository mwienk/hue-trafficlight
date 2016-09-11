var gulp = require( 'gulp' )
    , paths = require( './paths.config' )
    , livereload = require( 'gulp-livereload' );

var arrWhatToCopy = [
    paths.src.assets + 'font/**/*'
];

module.exports = function() {
    return gulp.src( arrWhatToCopy, { base: paths.src.assets } )
        .pipe( gulp.dest( paths.dist.assets ) )
        .pipe( livereload() );
}
