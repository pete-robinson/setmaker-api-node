import appRoot from 'app-root-path'
import logger from '../middleware/logger.js'
import winston from 'winston'
import expressAsyncErrors from 'express-async-errors';
import config from 'config'

export default (app) => {
    // process.on('uncaughtException', (err) => {
    //     logger.error(err.message, err)
    //     process.exit(1)
    // })

    process.on('unhandledRejection', (err) => {
        throw err
    })
    
    // if (app.get('env') === 'test') {
        logger.exceptions.handle(
            new winston.transports.Console({
                colorize: true,
                prettyPrint: true
            }),
            new winston.transports.File({filename: `${appRoot}${config.get('node.logLocation.uncaughtException')}`})
        )
    // }
}