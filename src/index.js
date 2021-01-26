import express from 'express'
import logger from './middleware/logger.js'
import loader from './loaders/index.js'

const startup = async () => {
    const app = express()
    await loader(app)

    /**
     * init server
     */
    const port = process.env.PORT || 3000
    const server = app.listen(port, () => {
        logger.info(`Listening on port ${port}`)
    })

    return server
}

export default startup()