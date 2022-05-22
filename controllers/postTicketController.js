const { dbService } = require('../services')

module.exports = function(req, res) {
    const sum = dbService.yourFunction(1, 2)

    res.send('The sum is: ' + sum)
}