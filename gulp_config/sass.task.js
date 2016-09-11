var gulp = require( 'gulp' )
    , minifyCss = require( 'gulp-minify-css' )
    , rename = require( 'gulp-rename' )
    , autoprefixer = require( 'gulp-autoprefixer' )
    , globbing = require('gulp-css-globbing')
    , sass = require( 'gulp-sass' )
    , livereload = require( 'gulp-livereload' )
    , paths = require( './paths.config' );

function swallowError ( error ) {
    console.log( error.toString() );
    this.emit( 'end' );
}

module.exports = function( done ) {
  gulp.src( paths.src.scss + 'main.scss' )
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe( sass() )
    .on( 'error', swallowError )
    .pipe( autoprefixer( {
        browsers: [ 'last 2 versions' ],
        cascade: false
    } ) )
    .pipe( gulp.dest( paths.dist.css ) )
    .pipe( minifyCss( {
        keepSpecialComments: 0
    } ) )
    .pipe( rename( { extname: '.min.css' } ) )
    .pipe( gulp.dest( paths.dist.css ) )
    .pipe( livereload() )
    .on( 'end', done );
}
