const fs = require( 'fs' );
const hakuneko = require( 'hakuneko' );
const connector = hakuneko.kissmanga;

var pageFrom = ( process.argv.length > 2 ? process.argv[2] : 1 );
var pageTo = ( process.argv.length > 3 ? process.argv[3] : 9999 );
var pageFrom = parseInt( pageFrom ) || 1;
var pageTo = parseInt( pageTo ) || 9999;

/************
 *** MAIN ***
 ************/

connector.getMangas( ( error, mangaListWeb ) => {
    if( !error && mangaListWeb && mangaListWeb.length > 0 ) {
	// convert mangas into stored structure
	let mangas = mangaListWeb.map( manga => {
	    return {
                id: manga.u,
                title: manga.t
            };
        } );
        fs.writeFile( './kissmanga/mangas.json', JSON.stringify( mangas, null, 2 ), 'utf-8', error => {} );
    } else {
        console.error( 'Invalid manga list' );
    }
}, pageFrom, pageTo );
