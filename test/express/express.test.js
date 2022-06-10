//
// express.test (06/06/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const wrapper = require('../../express/express')

describe('express.express', () => {
    test('callWrapper_allParams_shouldValidate', () => {
        const express = require('express')
        const beforeFn = jest.fn()
        const afterFn = jest.fn()
        const addMiddlewaresFn = jest.fn()
        wrapper(express, {
            beforeInitialization: beforeFn,
            afterInitialization: afterFn,
            addMiddlewares: addMiddlewaresFn
        })
        expect(beforeFn.mock.calls.length).toBe(1)
        expect(afterFn.mock.calls.length).toBe(1)
        expect(addMiddlewaresFn.mock.calls.length).toBe(1)
    })

    test('callWrapper_missingAfterCallback_shouldThrow', () => {
        const express = require('express')

        expect.assertions(1)
        try {
            wrapper(express, {beforeInitialization: () => {}})
        } catch (error) {
            expect(error.message).toBe('expected afterInitialization callback.')
        }
    })

    test('callWrapper_missingAddMiddlewaresCallback_shouldThrow', () => {
        const express = require('express')
        expect.assertions(1)
        try {
            wrapper(express, {beforeInitialization: () => {}, afterInitialization: () => {}})
        } catch (error) {
            expect(error.message).toBe('expected addMiddlewares callback.')
        }
    })

    test('callWrapper_mockCatchAll_shouldValidate', () => {
        const req = {}
        const res = {
            status: () => {},
            send: () => {}
        }
        const done = () => {}
        const app = {
            use: (fn) => {
                if (typeof fn === 'function')
                    fn(req, res, done)
            },
            get: () => undefined
        }
        const express = () => { return app }
        express.json = () => undefined

        wrapper(express, {
            beforeInitialization: () => {},
            afterInitialization: () => {},
            addMiddlewares: () => {}
        })
    })
})
