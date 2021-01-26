import express from 'express'
import mongooseLoader from './mongoose.js'
import loggerLoader from './logger.js'
import routersLoader from './routers.js'
import middlewareLoader from './middleware.js'
import validationLoader from './validation.js'

 const loader = async (app) => {
    
    /**
     * Logging
     */
    loggerLoader(app)

    /**
     * Database
     */
    await mongooseLoader(app)

    /**
     * Middleware
     * json, helmet, cors, morgan
     */
    middlewareLoader(app, express)

    /**
     * validation
     */
    validationLoader(app)

    /**
     * routes
     */
    routersLoader(app)

}

export default loader