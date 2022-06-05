//
// database.test (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza


jest.mock('npm-sqlite')

const database = require('../../utilities/database')
const sqlite = require('npm-sqlite')
const logger = require('../../utilities/logger')
jest.mock('../../utilities/logger')

logger.info.mockImplementation(() => undefined)

test('should init', () => { 
    const runnerFn = jest.fn().mockImplementation(() => {})
    sqlite.configure.mockImplementation(runnerFn)
    database.init()
    expect(runnerFn).toHaveBeenCalled()
    expect(runnerFn.mock.calls.length).toBe(1)
})

test('should run in transaction', () => { 
    const runnerFn = jest.fn().mockImplementation(() => {})
    sqlite.runInTransaction.mockImplementation(runnerFn)
    database.runInTransaction()
    expect(runnerFn).toHaveBeenCalled()
    expect(runnerFn.mock.calls.length).toBe(1)
})

test('should query', () => { 
    const runnerFn = jest.fn().mockImplementation(() => {})
    sqlite.query.mockImplementation(runnerFn)
    database.query()
    expect(runnerFn).toHaveBeenCalled()
    expect(runnerFn.mock.calls.length).toBe(1)
})