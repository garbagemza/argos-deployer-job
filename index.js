require('dotenv').config();
const express = require('express')
const { envcheck, logger, handler, validator, database } = require('./utilities')
const { validatePostTicket } = require('./models')
const { catchAll, health } = require('./middlewares')

const { postTicketController } = require('./controllers')

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
app.post('/ticket', validator(validatePostTicket))
app.post('/ticket', handler(postTicketController))

// catch for liveness probe
health(app)

// this middleware catches the unhandled paths
catchAll(app, handler)

logger.info(`argos-deploy rolling on port: ${process.env.PORT}`)
app.listen(process.env.PORT)
