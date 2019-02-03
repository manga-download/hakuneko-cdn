const fs = require( 'fs' );
const path = require( 'path' );
const { ConsoleLogger } = require('logtrine');

module.exports = class IO {

    /**
     * 
     * @param {*} logger 
     */
    constructor(logger) {
        this.logger = logger || new ConsoleLogger(ConsoleLogger.LEVEL.None);
    }

    /**
     * 
     * @param {*} dir 
     */
    createDirectoryChain(dir) {
        if(fs.existsSync(dir) || dir === path.parse(dir).root) {
            return;
        }
        createDirectoryChain(path.dirname(dir));
        fs.mkdirSync(dir, '0755', true);
    }

    /**
     * 
     * @param {*} file 
     * @param {*} data 
     */
    saveFileJSON(file, data ) {
        this.createDirectoryChain(path.dirname(file));
        let content = JSON.stringify(data, null, 2);
        fs.writeFile(file, content, 'utf-8', error => {
            if(error) {
                logger.error(error);
            }
        });
    }
}