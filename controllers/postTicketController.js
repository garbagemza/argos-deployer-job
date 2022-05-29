const { dbService } = require('../services')
const { validatePostTicket } = require('../models')
const createError = require('http-errors')

module.exports = function(req, res) {
    const sum = dbService.yourFunction(1, 2)
    res.send(`Your sum is ${sum}`)
}