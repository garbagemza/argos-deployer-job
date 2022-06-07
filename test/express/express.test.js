//
// express.test (06/06/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const wrapper = require('../../express')

test('should expect required callbacks and one or more do not exist', () => {
    const t = () => wrapper()
    expect(t).toThrow()
})

// test('should initialize', () => {
//     const beforeFn = jest.fn()
//     wrapper({
//         beforeInitialization: beforeFn
//     })
//     expect(beforeFn.mock.calls.length).toBe(1)

// })