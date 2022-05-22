const createError = require('http-errors')

module.exports = function catchAll(app) {
    app.use((req, res, next) => {
        res.status(404)
        res.json(new createError(404, "Not found."))
    })    
}
