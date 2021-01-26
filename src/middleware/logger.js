import winston from 'winston'
import winstonMongo from 'winston-mongodb'
import appRoot from 'app-root-path'

export default winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            colorize: true,
            prettyPrint: true
        }),
        new winston.transports.MongoDB({
            db: 'mongodb://localhost/vidly',
            level: 'warn'
        }),
        new winston.transports.File({
            filename: `${appRoot}/logs/app.log`,
            level: 'warn'
        })
    ]
});

