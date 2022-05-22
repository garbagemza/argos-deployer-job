const createError = require("http-errors")

module.exports = function (variables) {
    variables.forEach(function(variable) {
        if (process.env[variable] === undefined) environmentNotFound(variable)
    })
}

function environmentNotFound(envName) {
    throw new createError(500, 'Environment variable "' + envName + '" not supplied.')
}