import logger from '../middleware/logger.js'

class SongsController {
    /**
     * Constructor
     * @param {obj} songService 
     */
    constructor(SongService, ArtistService) {
        this.songService = new SongService()
        this.artistService = new ArtistService()
    }

    /**
     * get songs
     * return a list of all songs
     */
    getSongs = async (req, res, next) => {
        const songs = await this.songService.fetchAll()
        return res.json(songs)
    }

    /**
     * get songs
     * return a list of all songs
     */
    getSongsByArtist = async (req, res, next) => {
        console.log('here')
        const artist = await this.artistService.getById(req.params.id)
        if (!artist) return res.status(404).send({ error: 'Artist not found' })

        const songs = await this.songService.getByArtist(artist)
        return res.json(songs)
    }

    /**
     * get song (by id)
     * return a single song
     */
    getSong = async (req, res, next) => {
        const song = await this.songService.getById(req.params.id)
        if (!song) return res.status(404).send({ error: 'Song not found' })
        
        return res.json(song)
    }

    /**
     * Create new song
     */
    createSong = async (req, res, next) => {
        // get data transfer object from request body
        const dto = req.body

        try {
            // create new song
            const song = await this.songService.create(dto)
            return res.json(song)
            // return res.send('ok')
        } catch (e) {
            // catch errors...
            // 11000 = entry already exists
            return res.status(400).send({ error: e.message })
        }
    }

    /**
     * Update song
     */
    updateSong = async (req, res, next) => {
        // get data transfer object from request body
        const dto = req.body
        logger.info(dto)

        try {
            // update song
            const song = await this.songService.update(req.params.id, dto)
            if (!song) return res.status(404).send({ error: 'Song not found' })

            return res.json(song)
        } catch (e) {
            // catch errors...
            return res.status(400).send({ error: e.message })
        }
    }

    /**
     * Delete song
     */
    deleteSong = async (req, res, next) => {
        try {
            // try to delete song
            const song = await this.songService.delete(req.params.id)
            if (!song) return res.status(404).send({ error: 'Song not found' })

            return res.json(song)
        } catch (e) {
            // catch errors...
            return res.status(400).send({ error: e.message })
        }
    }
}


export default SongsController