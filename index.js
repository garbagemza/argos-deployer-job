require('dotenv').config();
const express = require('express')
const createError = require('http-errors')

const { envcheck, logger } = require('./utilities')

const { catchAll, health } = require('./middlewares')

const { 
	getYourPathController
} = require('./controllers')

const app = express()

// this checks the existence of environment variables, if they are not declared
// an exception will be thrown.
envcheck(['PORT'])

// add your middleware here
app.get('/your/path', getYourPathController)

// catch for liveness probe
health(app)

// this middleware catches the unhandled paths
catchAll(app)

logger.info(`argos-deploy rolling on port: ${process.env.PORT}`)
app.listen(process.env.PORT)

