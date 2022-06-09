//
// express.test (06/06/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const wrapper = require('../../express')

describe('express.express', () => {
    test('callWrapper_allParams_shouldValidate', () => {
        const beforeFn = jest.fn()
        const afterFn = jest.fn()
        wrapper({
            beforeInitialization: beforeFn,
            afterInitialization: afterFn
        })
        expect(beforeFn.mock.calls.length).toBe(1)
        expect(afterFn.mock.calls.length).toBe(1)
    })

    test('callWrapper_missingAfterCallback_shouldThrow', () => {
        expect.assertions(1)
        try {
            wrapper({beforeInitialization: () => {}})
        } catch (error) {
            expect(error.message).toBe('expected afterInitialization callback.')
        }
    })
})
