//
// getTicketController (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { dbService } = require('../services')
const createError = require('http-errors')

module.exports = function(req, res) {
    const ticketId = req.params.ticket
    const ticket = dbService.getTicket(ticketId)
    if (ticket != null) 
        res.send(ticket)
    else {
        res.status(404)
        res.send(createError(404))
    }
}