require('dotenv').config();
const express = require('./express')

const { envcheck, logger, handler, bodyValidator, paramValidator, database } = require('./utilities')
const { validateTicket, validatePostTicket } = require('./models')

const { getTicketController, postTicketController } = require('./controllers')

express({
    verbose: logger,
    beforeInitialization: () => {
        // this checks the existence of environment variables, if they are not declared
        // an exception is thrown.
        envcheck(['PORT', 'WORKDIR'])

        database.init()
    },
    addMiddlewares: (app) => {
        app.post('/ticket', bodyValidator(validatePostTicket))
        app.post('/ticket', handler(postTicketController))

        app.get('/ticket/:ticket', paramValidator(validateTicket))
        app.get('/ticket/:ticket', handler(getTicketController))
    },
    afterInitialization: (app) => {
        logger.info(`argos-deploy.port ${process.env.PORT}`)
        app.listen(process.env.PORT)
    }
})

