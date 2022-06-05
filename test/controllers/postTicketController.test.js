//
// postTicketController.test (06/05/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

jest.mock('../../services')
const dbService = require('../../services').dbService

const { postTicketController } = require('../../controllers')

test('should find ticket', () => {
    const statusFn = jest.fn()
    const sendFn = jest.fn()
    const res = {send: sendFn, status: statusFn }
    const mockFn = jest.fn(() => { return 'nice'})
    dbService.postTicket.mockImplementation(mockFn)
    const req = { body: {userName: '123', repositoryName: 'bla-nana'}}
    const t = () => postTicketController(req, res)
    expect(t).not.toThrow()
})
