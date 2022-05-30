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

module.exports = {
    init
}
