import { EventEmitter } from 'events'
import logger from '../middleware/logger.js'

/**
 * This would be SO much easier and cleaner
 * using Decorators with TypeScript
 * @todo refactor this API to TypeScript
 */
class ArtistSubscriber extends EventEmitter { }

const subscriber = new ArtistSubscriber

/**
 * Artist Created event
 */
subscriber.on('events.artist.created', ({ artist }) => {
    logger.info('events.artist.created event called')
})

/**
 * Artist Updated event
 */
subscriber.on('events.artist.updated', ({ artist }) => {
    logger.info('events.artist.updated event called')
})

/**
 * Artist Deleted event
 */
subscriber.on('events.artist.deleted', ({ artist }) => {
    logger.info('events.artist.deleted event called')
})

export { subscriber }