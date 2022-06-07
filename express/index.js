const express = require('express')
var app = {}

module.exports = (callbacks) => {
    checkRequiredCallbacks(callbacks)

    const app = express()

}

const checkRequiredCallbacks = function(callbacks) {
    const names = ['beforeInitialization']
    names.forEach(name => {
        if (callbacks[name] === undefined) {
            throw Error(`expected callback ${name}.`)
        }
    })
}