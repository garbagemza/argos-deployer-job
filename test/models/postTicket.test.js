//
// postTicket.test (06/05/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { validatePostTicket } = require('../../models')

test('should not throw', () => {
    const t = () => validatePostTicket({userName: '123', repositoryName:'a-b'})
    expect(t).not.toThrow()
})

test('should throw', () => {
    const t = () => validatePostTicket({})
    expect(t).toThrow()
})