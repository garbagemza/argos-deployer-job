

const { catchAll, health } = require('../middlewares')
const { handler } = require('../utilities')

const loggerStub  = require('./loggerStub')

var logger = {}

module.exports = (express, options) => {
    logger = options.verbose || loggerStub

    const app = express()
    checkRequiredCallbacks(options)
    options.beforeInitialization(app)
    beforeMiddleware(express, app)
    options.addMiddlewares(app)
    afterMiddleware(app)
    options.afterInitialization(app)
}

const checkRequiredCallbacks = function(callbacks) {
    const names = ['beforeInitialization', 'afterInitialization', 'addMiddlewares']
    names.forEach(name => {
        if (callbacks[name] === undefined) {
            throw Error(`expected ${name} callback.`)
        }
    })
}

const beforeMiddleware = function(express, app) {
    app.use(express.json())

    // this middleware intercepts all calls and log the path
    app.use( (req, _, done) => {
        logger.info(`[${req.method}] ${req.originalUrl}`);
        done();
    })
}

const afterMiddleware = function(app) {
    health(app)
    catchAll(app, handler)
}
