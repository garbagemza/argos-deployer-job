const { logger } = require('../utilities')
const db = require('better-sqlite3')('foobar.db', { verbose: logger.info });

function yourFunction(a, b) {
    const stmt = db.prepare('CREATE TABLE IF NOT EXISTS cats (name STRING, age INTEGER);')
    const result = stmt.run()
    return result
}

module.exports = {
    yourFunction
}