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
    const value = schema.validate(json)
    if (value.error) {
        throw value.error
    } else {
        return value
    }
}

module.exports = validate