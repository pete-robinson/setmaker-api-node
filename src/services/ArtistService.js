import { validate, Artist } from '../models/artist.js'
import { subscriber } from '../subscribers/ArtistSubscriber.js'


class ArtistService {
    constructor() {
        this.model = Artist
        this.eventEmitter = subscriber
    }

    /**
     * get artists 
     * @todo implement searching
     */
    async fetchAll() {
        return await this.model.find().sort({ name: 1 }).populate('Song')
    }

    /**
     * Get single artist by slug
     * @param {str} slug
     */
    async getBySlug(slug) {
        return await this.model.findOne({ slug: slug })
    }

    /**
     * Get single artist by id
     * @param {str} id
     */
    async getById(id) {
        return await this.model.findById(id)
    }

    /**
     * Create a new artist
     * @emits events.artist.created
     * @param {obj} data 
     */
    async create(data) {
        const error = validate(data)
        if (error) throw new Error(error.details[0].message)

        const artist = new this.model({
            name: data.name,
            image: data.image
        })

        await artist.save()

        if (artist) {
            this.eventEmitter.emit('events.artist.created', { artist })
        }

        return artist
    }

    /**
     * Update an artist
     * @emits events.artist.updated
     * @param {str} slug
     * @param {obj} data 
     */
    async update(slug, data) {
        const error = validate(data)
        if (error) throw new Error(error.details[0].message)

        const artist = await this.model.findOneAndUpdate({ slug: slug }, data, { new: true })
        if (artist) this.eventEmitter.emit('events.artist.updated', { artist })

        return artist
    }

    /**
     * Delete an artist
     * @emits events.artist.deleted
     * @param {str} slug
     */
    async delete(slug) {
        const artist = await this.model.findOneAndDelete({ slug })
        if (artist) this.eventEmitter.emit('events.artist.created', { artist })
        
        return artist
    }

    /**
     * Add song to artist
     * @param {obj} artist
     * @param {obj} song
     */
    async addSongToArtist(artist, song) {
        artist.songs.push({
            _id: song._id,
            title: song.title
        })

        await artist.save()
        return artist
    }

    /**
     * Remove song from artist
     * @param {obj} artist
     * @param {obj} song
     */
    async deleteSongFromArtist(artist, song) {
        artist.songs.pull({
            _id: song._id
        })

        await artist.save()
        return artist
    }

    /**
     * Update song for artist
     * @param {obj} artist
     * @param {obj} song
     */
    async updateSongForArtist(artist, song) {
        const result = await this.model.findOneAndUpdate({"_id": artist._id, "songs._id": song._id}, {
            "$set": {
                "songs.$.title": song.title
            }
        }, { new: true })

        return result
    }
}

export default ArtistService