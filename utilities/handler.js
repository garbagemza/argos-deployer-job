const logger = require('./logger')
const createError = require('http-errors')

const handler = (func) => (req, res, done) => {
    try {
        logger.info('server.handler.begun');
        func(req, res, logger);
    } catch(e){
            logger.error('server.handler.failed');
            logger.error(e.stack)
            res.status(500)
            res.send(new createError(500))
    }
}

module.exports = handler