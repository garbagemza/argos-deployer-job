//
// getTicketController.test (06/05/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

jest.mock('../../services')
const dbService = require('../../services').dbService

const { getTicketController } = require('../../controllers')

test('should find ticket', () => {
    const statusFn = jest.fn()
    const sendFn = jest.fn()
    const res = {send: sendFn, status: statusFn }
    const mockFn = jest.fn(() => { return {uuid: 'nice'}})
    dbService.getTicket.mockImplementation(mockFn)
    const req = { params: {ticket: '123'}}
    const t = () => getTicketController(req, res)
    expect(t).not.toThrow()
})

test('should not find ticket', () => {
    const statusFn = jest.fn()
    const sendFn = jest.fn()
    const res = {send: sendFn, status: statusFn }
    const mockFn = jest.fn(() => { return null})
    dbService.getTicket.mockImplementation(mockFn)
    const req = { params: {ticket: '123'}}
    const t = () => getTicketController(req, res)
    expect(t).not.toThrow()
})