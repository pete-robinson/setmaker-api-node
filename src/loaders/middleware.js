import morgan from 'morgan'
import helmet from 'helmet'
import logger from '../middleware/logger.js'
import cors from 'cors'

export default (app, express) => {
    /**
     * JSON parsing
     */
    app.use(express.json())

    /**
     * Helmet security
     */
    app.use(helmet())

    /**
     * Morgan for request logging
     */
    if (app.get('env') === 'development') {
        app.use(morgan('tiny'))
        logger.info('Morgan enabled')
    }

    /**
     * CORS middleware
     * Allows for x-origin sharing - exposes APIs
     */
    app.use(cors());
}