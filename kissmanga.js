const IO = require('./_io.js');
const Logger = require('logtrine').FileLogger;
const Scraper = require('hakuneko').KissManga;
const id = 'kissmanga';

var pageFrom = ( process.argv.length > 2 ? process.argv[2] : 1 );
var pageTo = ( process.argv.length > 3 ? process.argv[3] : 9999 );
var pageFrom = parseInt( pageFrom ) || 1;
var pageTo = parseInt( pageTo ) || 9999;

/************
 *** MAIN ***
 ************/

var logger = new Logger(`./${id}.log`, Logger.LEVEL.All);
logger.clear();
var io = new IO(logger);
var scraper = new Scraper(logger);

scraper.getMangaList(pageFrom, pageTo)
.then(mangaListWeb => {
    if(!mangaListWeb || !mangaListWeb.length) {
        throw new Error('Invalid manga list!');
    }
    logger.debug(`Web: ${mangaListWeb.length} mangas`);
    let mangaListLocal = io.loadFileJSON(`./${id}/mangas.json`);
    logger.debug(`Local: ${mangaListLocal.length} mangas`);
    let mangaList = mangaListLocal.concat(mangaListWeb);
    mangaList = io.unique(mangaList);
    logger.debug(`Merged: ${mangaList.length} mangas`);
    io.saveFileJSON(`./${id}/mangas.json`, mangaList);
})
.catch(error => {
    logger.error(error);
});