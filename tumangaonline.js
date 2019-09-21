const IO = require('./_io.js');
const Logger = require('@logtrine/logtrine').FileLogger;
const Scraper = require('@hakuneko/scrapers').TuMangaOnline;
const id = 'tumangaonline';

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

scraper.requestOptions.headers['Cookie'] = '__cfduid=d13ce038d855884d8620efe3ae9ed3a8d1569092184; cf_clearance=5b3a52e7b50fd27c8ee31e28d792745004cd60eb-1569092188-14400-150';
scraper.requestOptions.headers['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36';

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