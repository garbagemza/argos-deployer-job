//
// dbService.test (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

jest.mock('../../utilities')
const database = require('../../utilities').database

const { dbService } = require('../../services')

const getTicketFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation(() => {
        return [
            {
                status: "status",
                issuedDate: "issued",
                lastModifiedDate: "modified",
                engine: "engine",
                user: "user",
                repo: "repo"
            }
        ]})
    .mockName('getTicket');

const notFoundTicketFn = jest.fn()
        .mockReturnValue('default')
        .mockImplementation(() => [])
        .mockName('notFoundTicket')

const uuidTicketFn = jest.fn()
    .mockReturnValue('default')
    .mockImplementation(() => [{uuid: 'niceUuid'}])
    .mockName('uuidTicketFn')

test('dbService_getTicket_withExistingTicket', () => {

    database.query.mockImplementation(getTicketFn)

    const ticket = dbService.getTicket('1234')
    expect(getTicketFn).toHaveBeenCalled()
    expect(getTicketFn.mock.calls.length).toBe(1)
    expect(ticket).toStrictEqual({status: 'status', issuedDate: 'issued', lastModifiedDate: 'modified', engine: 'engine', user: 'user', repo: 'repo'})
})

test('dbService_getTicket_withNonExistingTicket', () => {

    database.query.mockImplementation(notFoundTicketFn)
    const ticket = dbService.getTicket('1234')
    expect(getTicketFn).toHaveBeenCalled()
    expect(getTicketFn.mock.calls.length).toBe(1)
    expect(ticket).toStrictEqual(null)
})

test('dbService_postTicket_withExistingTicket', () => {
    database.query.mockImplementation(uuidTicketFn)
    const result = dbService.postTicket('user', 'repo')
    expect(uuidTicketFn.mock.calls.length).toBe(1)
    expect(result).toBe('niceUuid')    
})

test('dbService_postTicket_withNonExistingTicket', () => {
    database.query.mockImplementation(notFoundTicketFn)
    dbService.postTicket('user', 'repo')
    expect(uuidTicketFn.mock.calls.length).toBe(1)
    
})