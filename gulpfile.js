var gulp = require( 'gulp' );

gulp.task( 'build', require( './gulp_config/build.task.js' ) );
gulp.task( 'browserify', require( './gulp_config/browserify.task.js' ) );
gulp.task( 'clean', require( './gulp_config/clean.task.js' ) );
gulp.task( 'copy', require( './gulp_config/copy.task.js' ) );
gulp.task( 'default', require( './gulp_config/default.task.js' ) );
gulp.task( 'sass', require( './gulp_config/sass.task.js' ) );
gulp.task( 'watch', require( './gulp_config/watch.task.js' ) );
gulp.task( 'jshint', require( './gulp_config/jshint.task.js' ) );
