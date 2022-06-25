const logger = require('./logger.js')
const sqlite = require('npm-sqlite')
var db = {}

const init = function() {
    logger.info(`utilities.database.configure`)

    const options = {
        workdir: process.env['WORKDIR'],
        migrationDir: './migration',
        databaseName: 'deploys.db',
        databaseVersion: 1,
        verbose: logger.info,
    }
    db = sqlite.configure(options)
}

const runInTransaction = function(statements) {
    logger.info(`utilities.database.runintransaction`)
    sqlite.runInTransaction(db, statements, logger.info)
}

const query = function(statement) {
    logger.info(`utilities.database.query`)
    return sqlite.query(db, statement, logger.info)
}

module.exports = {
    init,
    runInTransaction,
    query
}
