const { database } = require('../utilities')
const { nanoid } = require('nanoid')

function postTicket(userName, repositoryName) {
    const uuid = nanoid()
    const insertDeploy = `INSERT INTO deploys (uuid, engine, user, repo) VALUES ('${uuid}', 'github', '${userName}', '${repositoryName}');`
    const insertStatus = `INSERT INTO deploy_statuses
                                (deployUuid, status, reason, date)
                            VALUES
                                ('${uuid}', 'PENDING', 'User triggered deploy for ${userName}/${repositoryName}', datetime());`

    const statements = [insertDeploy, insertStatus]
    database.runInTransaction(statements)

    return `${userName}/${repositoryName}`
}

module.exports = {
    postTicket
}
