import { validate, Song } from '../models/song.js'
import { subscriber } from '../subscribers/SongSubscriber.js'
import ArtistService from './ArtistService.js'

class SongService {

    constructor() {
        this.model = Song
        this.eventEmitter = subscriber
        this.artistService = new ArtistService
    }

    /**
     * get all songs
     * @todo implement searching 
     */
    async fetchAll() {
        return await this.model.find().sort({ name: 1 }).populate('artist')
    }

    /**
     * get all songs by a given artist
     * @todo implement searching 
     */
    async getByArtist(artist) {
        return await this.model.find({ artist }).sort({ name: 1 })
    }

    /**
     * Get single song by id
     * @param {str} id
     */
    async getById(id) {
        return await this.model.findById(id)
    }

    /**
     * Create a new song
     * @emits events.song.created
     * @param {obj} data 
     */
    async create(data) {
        const error = validate(data)
        if (error) throw new Error(error.details[0].message)

        const artist = await this.artistService.getById(data.artistId)
        if (!artist) throw new Error('Artist not found')

        const song = new this.model({
            title: data.title,
            artist: artist,
            key: data.key,
            tonality: data.tonality
        })

        await song.save()
        if (song) this.eventEmitter.emit('events.song.created', { song, artist })

        return song
    }

    /**
     * Update a song
     * @emits events.song.updated
     * @param {obj} data 
     */
    async update(id, data) {
        const error = validate(data)
        if (error) throw new Error(error.details[0].message)

        const artist = await this.artistService.getById(data.artistId)
        if (!artist) throw new Error('Artist not found')

        console.log(artist)

        const song = await this.model.findOneAndUpdate({ _id: id }, {
            title: data.title,
            artist: artist,
            key: data.key,
            tonality: data.tonality
        }, { new: true })

        if (song) this.eventEmitter.emit('events.song.updated', { song, artist })

        return song
    }

    /**
     * Delete a song
     * @emits events.song.deleted
     * @param {obj} data 
     */
    async delete(id) {
        const song = await this.model.findOneAndDelete({ _id: id }).populate('artist')
        if (song) this.eventEmitter.emit('events.song.deleted', { song })
        
        return song
    }

}

export default SongService