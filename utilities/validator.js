const logger = require('./logger')
const createError = require('http-errors')

const validator = (func) => (req, res, done) => {
    try {
        logger.info('server.validator.begun')
        logger.info(`server.validator.data ${JSON.stringify(req.body)}`)
        func(req.body)
        done()
    } catch(e){
            logger.warn('server.validator.failed')
            logger.warn(e.message)
            res.status(400)
            res.send(new createError(400))
    }
}

module.exports = validator