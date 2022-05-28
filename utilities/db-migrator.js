const logger = require('./logger.js')

const db = require('better-sqlite3')(process.env['WORKDIR'] + '/deploys.db', { verbose: logger.info })

const dbMigrator = function(requiredVersion) {
    const currentVersion = currentDBVersion()

    logger.info(`current db version:  ${currentVersion}`)
    logger.info(`required db version: ${requiredVersion}`)

    for (let index = currentVersion; index < requiredVersion; index++) {
        logger.info(`migrating db from ${index} to ${index + 1}`)
        const transaction = db.transaction((stmts) => {
            for (const stmt of stmts) stmt.run()
        })
        const statements = prepareStatements(index + 1)
        transaction(statements)
    }
}
const prepareStatements = function(desiredVersion) {
    return [
        db.prepare('CREATE TABLE deploys (id INTEGER PRIMARY KEY, uuid STRING NOT NULL, issuedAt STRING NOT NULL);'),
        db.prepare(`PRAGMA user_version = ${desiredVersion}`)
    ]
}

const currentDBVersion = function() {
    const row = db.prepare('PRAGMA user_version;').get()
    return row.user_version
}

module.exports = dbMigrator