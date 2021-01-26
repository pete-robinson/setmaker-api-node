import { EventEmitter } from 'events'
import logger from '../middleware/logger.js'
import ArtistService from '../services/ArtistService.js'

/**
 * This would be SO much easier and cleaner
 * using Decorators with TypeScript
 * @todo refactor this API to TypeScript
 */
class SongSubscriber extends EventEmitter { }

const subscriber = new SongSubscriber

/**
 * Song Created Event
 */
subscriber.on('events.song.created', ({ song, artist }) => {
    logger.info('events.song.created event called')
    
    // add the song to the subdocument array for artist
    const as = new ArtistService()
    as.addSongToArtist(artist, song)
})

/**
 * Song updated event
 */
subscriber.on('events.song.updated', ({ song, artist }) => {
    logger.info('events.song.updated event called')

    // update the song in the subdocument array for artist
    const as = new ArtistService()
    as.updateSongForArtist(artist, song)
})

/**
 * Song deleted event
 */
subscriber.on('events.song.deleted', ({ song }) => {
    logger.info('events.song.deleted event called')

    // delete the song from the subdocument array for artist
    if(song.artist) {
        const as = new ArtistService()
        as.deleteSongFromArtist(song.artist, song)
    }
})

export { subscriber }