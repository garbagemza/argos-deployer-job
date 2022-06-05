//
// logger.test (06/05/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza
describe('logger', () => { 
    const OLD_ENV = process.env

    beforeEach(() => {
      jest.resetModules()
      process.env = { ...OLD_ENV }
    })

    afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
    })

    test('should load mock logger', () => {
        process.env['IGNORE_LOGGER'] = true
        const logger = require('../../utilities/logger')
        logger.info('logger.test')
    })
    
    test('should load real logger', () => {
        process.env['IGNORE_LOGGER'] = false
        process.env['WORKDIR'] = '.'
        const logger = require('../../utilities/logger')
        logger.info('logger.test')
    })
})

