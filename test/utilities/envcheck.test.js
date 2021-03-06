//
// envcheck.test (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { envcheck } = require('../../utilities')

test('should not throw exception', () => {
    process.env['exists'] = 1
    const t = () => envcheck(['exists'])
    expect(t).not.toThrow()
})

test('should throw exception', () => {
    const t = () => envcheck(['anyparam'])
    expect(t).toThrow()
})
