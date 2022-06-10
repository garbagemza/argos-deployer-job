//
// builder.test (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const Builder = require('../../express/builder')


describe('express.builder', () => {
    test('callAllInitializers_shouldValidate', () => { 
        const bodyValidator = () => {}
        const paramValidator = () => {}
        const handler = () => {}
        const controller = () => {}
        const app = {
            post: () => {}
        }
        const builder = new Builder()
        const object = builder.withApp(app)
            .withBodyValidator(bodyValidator)
            .withParamValidator(paramValidator)
            .withHandler(handler)
            .post('/ticket')
            .validateBody(bodyValidator)
            .validateParam(paramValidator)
            .controller(controller)
            .build()

        expect(object).toStrictEqual({})
    })
})
