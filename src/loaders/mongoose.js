import mongoose from 'mongoose'
import config from 'config'
import logger from '../middleware/logger.js'


export default async () => {
    const uri = `${config.get('database.url')}/${config.get('database.name')}`

    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000
    })
    .then(() => {
        logger.info(`Connected to ${uri}`)
    })
}