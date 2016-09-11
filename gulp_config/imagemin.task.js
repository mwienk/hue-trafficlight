var gulp = require( 'gulp' )
    , imagemin = require( 'gulp-imagemin' )
    , pngquant = require( 'imagemin-pngquant' )
    , paths = require( './paths.config' )
    , livereload = require( 'gulp-livereload' );

module.exports = function () {
    gulp.src( paths.src.img + '*' )
        .pipe( imagemin( {
            progressive: true,
            svgoPlugins: [ { removeViewBox: false } ],
            use: [ pngquant() ]
        }))
        .pipe( gulp.dest( paths.dist.img ) )
        .pipe( livereload() );
};
