const express = require('express')
var app = {}

module.exports = (callbacks) => {
    checkRequiredCallbacks(callbacks)
    const app = express()
    callbacks.beforeInitialization(app)
    callbacks.afterInitialization(app)
}

const checkRequiredCallbacks = function(callbacks) {
    const names = ['beforeInitialization', 'afterInitialization']
    names.forEach(name => {
        if (callbacks[name] === undefined) {
            throw Error(`expected ${name} callback.`)
        }
    })
}
