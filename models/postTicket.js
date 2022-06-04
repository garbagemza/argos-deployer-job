const _validate = require('./validate')

const joi = require('joi')

const schema = joi.object({
    userName: joi.string()
                        .min(3)
                        .alphanum()
                        .required(),
    repositoryName: joi.string()
                        .min(3)
                        .required()
})

const validate = function(json) {
    return _validate(schema, json)
}

module.exports = validate