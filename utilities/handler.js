const logger = require('./logger')

const handler = (func) => (req, res, done) => {
    try {
        logger.info('server.handler.begun');
        func(req, res, logger);
    } catch(e){
        logger.error('server.handler.failed');
        logger.error(e)
        done()
    }
}

module.exports = handler