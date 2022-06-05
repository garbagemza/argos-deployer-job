//
// validateTicket.test (06/05/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { validateTicket } = require('../../models')

test('should validate ticket', () => {
    const t = () => validateTicket({ticket: '123'})
    expect(t).not.toThrow()
})

test('should throw', () => {
    const t = () => validateTicket({})
    expect(t).toThrow()
})
