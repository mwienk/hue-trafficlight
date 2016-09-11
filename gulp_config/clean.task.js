var gulp = require( 'gulp' )
    , del = require( 'del' )
    , paths = require( './paths.config' );

var arrWhatToDel = [
    paths.dist.root,
    paths.pkgm.bower
];

module.exports = function() {
    del( arrWhatToDel, function ( err, paths ) {
        console.log( 'Deleted files/folders:\n', paths.join( '\n' ) );
    });
}
