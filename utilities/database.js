const logger = require('./logger.js')
const sqlite = require('npm-sqlite')

const options = {
    workdir: process.env['WORKDIR'],
    databaseName: 'deploys.db',
    databaseVersion: 1,
    verbose: logger.info,
}

logger.warn(`utilities.database configure: ${JSON.stringify(options)}`)
sqlite.configure(options)

module.exports = {
}