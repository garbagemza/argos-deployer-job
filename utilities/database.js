const logger = require('./logger.js')
const sqlite = require('npm-sqlite')

const options = {
    workdir: process.env['WORKDIR'],
    migrationDir: './migration',
    databaseName: 'deploys.db',
    databaseVersion: 1,
    verbose: logger.info,
}

logger.info(`utilities.database.configure`)
sqlite.configure(options)

module.exports = {
}