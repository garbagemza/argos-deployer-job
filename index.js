require('dotenv').config();
const express = require('express')
const { envcheck, logger, handler, bodyValidator, paramValidator, database } = require('./utilities')
const { validateTicket, validatePostTicket } = require('./models')
const { catchAll, health } = require('./middlewares')

const { getTicketController, postTicketController } = require('./controllers')

const app = express()

// this checks the existence of environment variables, if they are not declared
// an exception is thrown.
envcheck(['PORT', 'WORKDIR'])

// initializes database
database.init()

app.use(express.json())

// this middleware intercepts all calls and log the path
app.use( (req, _, done) => {
    logger.info(`[${req.method}] ${req.originalUrl}`);
    done();
})

// add your middleware here
app.post('/ticket', bodyValidator(validatePostTicket))
app.post('/ticket', handler(postTicketController))

app.get('/ticket/:ticket', paramValidator(validateTicket))
app.get('/ticket/:ticket', handler(getTicketController))

// catch for liveness probe
health(app)

// this middleware catches the unhandled paths
catchAll(app, handler)

logger.info(`argos-deploy.port ${process.env.PORT}`)
app.listen(process.env.PORT)
