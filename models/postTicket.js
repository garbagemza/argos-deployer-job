const joi = require('joi')

const schema = joi.object({
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