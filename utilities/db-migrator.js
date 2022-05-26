const logger = require('./logger.js')

const db = require('better-sqlite3')(process.env['WORKDIR'] + '/deploys.db', { verbose: logger.info })

const dbMigrator = function() {
    const stmt = db.prepare('CREATE TABLE IF NOT EXISTS deploys (id INTEGER PRIMARY KEY, uuid STRING NOT NULL, issuedAt STRING NOT NULL);')
    const result = stmt.run()
    logger.info(`current db version: ${userVersion()}`)
    
}

const userVersion = function() {
    const row = db.prepare('PRAGMA user_version;').get()
    return row.user_version
}

module.exports = dbMigrator