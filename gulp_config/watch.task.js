
var gulp = require( 'gulp' )
    , watch = require( 'gulp-watch' )
    , livereload = require( 'gulp-livereload' )
    , paths = require( './paths.config' )
    ;

module.exports = function() {
    livereload.listen();
    gulp.watch( paths.src.js + '**/**/*.js', [ 'jshint', 'browserify' ] );
    gulp.watch( paths.src.scss + '**', [ 'sass' ] );
    gulp.watch( paths.src.assets + '*', [ 'copy' ] );
    gulp.watch( paths.src.img + '*', [ 'imagemin' ] );
    gulp.watch( paths.pkgm.bower + '*', [ 'bower' ] );
};
