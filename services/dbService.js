const { database } = require('../utilities')
const { nanoid } = require('nanoid')

function getTicket(ticketId) {
    return getTicketByTicketId(ticketId)
}

function postTicket(userName, repositoryName) {
    const pendingTicket = getPendingTicket(userName, repositoryName)
    if (pendingTicket != null) {
        return pendingTicket.uuid
    } else {
        return saveTicket(userName, repositoryName)
    }
}

function saveTicket(userName, repositoryName) {
    const initialStatus = 'PENDING'
    const uuid = nanoid()
    const insertDeploy = `INSERT INTO deploys (uuid, status, issuedDate, lastModifiedDate, engine, user, repo) VALUES ('${uuid}', '${initialStatus}', datetime(), datetime(), 'github', '${userName}', '${repositoryName}');`
    const insertStatus = `INSERT INTO deploy_statuses
                                (deployUuid, status, reason, date)
                            VALUES
                                ('${uuid}', '${initialStatus}', 'User triggered deploy for ${userName}/${repositoryName}', datetime());`

    const statements = [insertDeploy, insertStatus]
    database.runInTransaction(statements)
    return uuid
}

/**
 * Get pending ticket based on userName and repositoryName
 *
 * @param {string} userName
 * @param {string} repositoryName
 * @returns gets ticket or null
 */
function getPendingTicket(userName, repositoryName) {
    const getTicket = `SELECT * FROM deploys d WHERE 1=1
        AND d.status = 'PENDING'
        AND d.engine = 'github'
        AND d.user = '${userName}'
        AND d.repo = '${repositoryName}'
        LIMIT 1;`
    const list = database.query(getTicket)
    return list[0] || null
}

function getTicketByTicketId(ticketId) {
    const statement = `SELECT status, issuedDate, lastModifiedDate, engine, user, repo FROM deploys d WHERE 1=1
    AND d.uuid = '${ticketId}'
    LIMIT 1;`
    const list = database.query(statement)
    return list[0] || null
}

module.exports = {
    getTicket,
    postTicket
}
