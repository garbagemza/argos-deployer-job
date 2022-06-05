//
// bodyValidator.test (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { bodyValidator } = require('../../utilities')

test('should validate ok', () => { 
    const statusFn = jest.fn((code) => {})
    const sendFn = jest.fn(() => {})
    const doneFn = jest.fn(() => {})

    const res = {
        status: statusFn,
        send: sendFn
    }
    const fn = (object) => {
        return object
    }
    bodyValidator(fn)({body: 'hello'}, res, doneFn)
    expect(statusFn.mock.calls.length).toBe(0)
    expect(sendFn.mock.calls.length).toBe(0)
    expect(doneFn.mock.calls.length).toBe(1)

})

test('should throw error', () => {
    const statusFn = jest.fn((code) => {})
    const sendFn = jest.fn(() => {})
    const doneFn = jest.fn(() => {})

    const res = {
        status: statusFn,
        send: sendFn
    }
    const fn = (object) => {
        throw {message: 'oops, an error'}
    }
    bodyValidator(fn)({body: {data: 'some data'}}, res, doneFn)
    expect(statusFn.mock.calls.length).toBe(1)
    expect(sendFn.mock.calls.length).toBe(1)
    expect(doneFn.mock.calls.length).toBe(0)
})
