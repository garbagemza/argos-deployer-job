require('dotenv').config();
const express = require('npm-express')

const { envcheck, logger, database } = require('./utilities')
const { validateTicket, validatePostTicket } = require('./models')

const { getTicketController, postTicketController } = require('./controllers')

const _logger = logger()

express({
    verbose: _logger,
    beforeInitialization: () => {
        // this checks the existence of environment variables, if they are not declared
        // an exception is thrown.
        envcheck(['PORT', 'WORKDIR'])
        database.init(_logger)
    },
    addMiddlewares: (app) => {
        app.builder()
            .post('/ticket')
            .validateBody(validatePostTicket)
            .controller(postTicketController)
            .build()

        app.builder()
            .get('/ticket/:ticket')
            .validateParam(validateTicket)
            .controller(getTicketController)
            .build()
    },
    afterInitialization: (app) => {
        _logger.info(`argos-deploy.port ${process.env.PORT}`)
        app.listen(process.env.PORT)
    }
})
