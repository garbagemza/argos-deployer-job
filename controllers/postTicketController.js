const { dbService } = require('../services')

module.exports = function(req, res) {
    const sum = dbService.yourFunctions(1, 2)

    res.send('The sum is: ' + sum)
}