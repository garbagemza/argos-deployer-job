//
// catch-all.test (06/05/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { catchAll } = require('../../middlewares')

test('should send error', () => {
    const useFn = jest.fn(() => {})
    const app = { use: useFn }
    const reqFn = jest.fn()
    const statusFn = jest.fn()
    const jsonFn = jest.fn()
    const warnFn = jest.fn()
    const logger = { warn: warnFn }
    const res = { status: statusFn, json: jsonFn }
    const handler = jest.fn((fn) => { fn(reqFn, res, logger)})
    const t = () => catchAll(app, handler)
    expect(t).not.toThrow()
})
