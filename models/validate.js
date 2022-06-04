//
// validate (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const validate = function(schema, json) {
    const value = schema.validate(json)
    if (value.error) {
        throw value.error
    } else {
        return value
    }
}

module.exports = validate