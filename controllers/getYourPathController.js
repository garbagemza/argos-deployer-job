const { yourService } = require('../services')

module.exports = function(req, res) {
    const sum = yourService.yourFunction(1, 2)

    res.send('The sum is: ' + sum)
}