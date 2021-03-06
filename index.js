require('dotenv').config();
const express = require('npm-express')
const winston = require('npm-logger')
const { envcheck, database } = require('./utilities')
const { validateTicket, validatePostTicket } = require('./models')

const { getTicketController, postTicketController } = require('./controllers')

const logger = winston('.')

express({
    verbose: logger,
    beforeInitialization: () => {
        // this checks the existence of environment variables, if they are not declared
        // an exception is thrown.
        envcheck(['PORT', 'WORKDIR'])
        database.init(logger)
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
        logger.info(`argos-deploy.port ${process.env.PORT}`)
        app.listen(process.env.PORT)
    }
})
