//
// validateTicket (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const _validate = require('./validate')
const joi = require('joi')

const schema = joi.object({
    ticket: joi.string().required()
})

const validate = function(json) {
    return _validate(schema, json)
}

module.exports = validate