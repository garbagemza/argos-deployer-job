const { database } = require('../utilities')
const { nanoid } = require('nanoid')

function postTicket(userName, repositoryName) {
    const lastPendingTicket = getLastPendingTicket(userName, repositoryName)
    if (lastPendingTicket != null) {
        return lastPendingTicket.uuid
    } else {
        return saveTicket(userName, repositoryName)
    }
}

function saveTicket(userName, repositoryName) {
    const uuid = nanoid()
    const insertDeploy = `INSERT INTO deploys (uuid, engine, user, repo) VALUES ('${uuid}', 'github', '${userName}', '${repositoryName}');`
    const insertStatus = `INSERT INTO deploy_statuses
                                (deployUuid, status, reason, date)
                            VALUES
                                ('${uuid}', 'PENDING', 'User triggered deploy for ${userName}/${repositoryName}', datetime());`

    const statements = [insertDeploy, insertStatus]
    database.runInTransaction(statements)
    return uuid
}

/**
 * Gets the last pending ticket
 *
 * @param {string} userName
 * @param {string} repositoryName
 * @returns last pending ticket or null
 */
function getLastPendingTicket(userName, repositoryName) {
    const getTicket = `SELECT * FROM deploys d INNER JOIN deploy_statuses ds
        WHERE ds.deployUuid = d.uuid
        AND ds.status = 'PENDING'
        AND d.engine = 'github'
        AND d.user = '${userName}'
        AND d.repo = '${repositoryName}'
        ORDER BY ds.date DESC
        LIMIT 1;`
    const list = database.query(getTicket)
    return list[0] || null
}

module.exports = {
    postTicket
}
