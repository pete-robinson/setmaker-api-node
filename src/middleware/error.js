import logger from './logger.js'

export default (err, req, res, next) => {
    logger.error(err.message, err)
    res.status(500).send({ error: 'A 500 error has occurred' })
}