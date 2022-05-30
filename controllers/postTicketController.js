const { dbService } = require('../services')
const createError = require('http-errors')

module.exports = function(req, res) {
    const body = req.body
    const userName = body.userName
    const repositoryName = body.repositoryName

    const sum = dbService.postTicket(userName, repositoryName)
    res.send(`Your sum is ${sum}`)
}
