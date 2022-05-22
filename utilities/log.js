const winston = require('winston')

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
      new winston.transports.File({
        filename: 'combined.log',
        timestamp: true,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(), 
          )
      }),
      new winston.transports.File({
        filename: 'app-error.log',
        level: 'error',
        timestamp: true,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(), 
          )
      }),
      new winston.transports.Console({
          level: 'debug',
          timestamp: true,
          format: winston.format.combine(
            winston.format.cli()
          )
      })
    ],
  })

module.exports = logger
