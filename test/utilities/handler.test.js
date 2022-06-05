//
// handler.test (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { handler } = require('../../utilities')

const logger = require('../../utilities/logger')
jest.mock('../../utilities/logger')

logger.info.mockImplementation(() => undefined)

test('should handle ok', () => { 
    const statusFn = jest.fn((code) => {})
    const sendFn = jest.fn(() => {})
    const doneFn = jest.fn(() => {})

    const res = {
        status: statusFn,
        send: sendFn
    }
    const fn = (req, res, logger) => {
        return undefined
    }
    handler(fn)({body: 'hello'}, res, doneFn)
    expect(statusFn.mock.calls.length).toBe(0)
    expect(sendFn.mock.calls.length).toBe(0)
    expect(doneFn.mock.calls.length).toBe(0)
})

test('should throw error', () => {
    const statusFn = jest.fn((code) => {})
    const sendFn = jest.fn(() => {})
    const doneFn = jest.fn(() => {})

    const res = {
        status: statusFn,
        send: sendFn
    }
    const fn = (req, res, logger) => {
        throw {message: 'oops, an error'}
    }
    handler(fn)({body: {data: 'some data'}}, res, doneFn)
    expect(statusFn.mock.calls.length).toBe(1)
    expect(sendFn.mock.calls.length).toBe(1)
    expect(doneFn.mock.calls.length).toBe(0)
})
