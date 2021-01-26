import logger from '../middleware/logger.js'

class ArtistsController {
    /**
     * Constructor
     * @param {obj} ArtistService 
     */
    constructor(ArtistService) {
        this.artistService = new ArtistService()
    }

    /**
     * get artists
     * return a list of all artists
     */
    getArtists = async (req, res, next) => {
        const artists = await this.artistService.fetchAll()
        return res.json(artists)
    }

    /**
     * get artist (by slug)
     * return a single artist
     */
    getArtist = async (req, res, next) => {
        const artist = await this.artistService.getBySlug(req.params.slug)
        if (!artist) return res.status(404).send({ error: 'Artist not found' })
        
        return res.json(artist)
    }

    /**
     * Create new artist
     */
    createArtist = async (req, res, next) => {
        // get data transfer object from request body
        const dto = req.body
        logger.info(dto)

        try {
            // create new artist
            const artist = await this.artistService.create(dto)
            return res.json(artist)
        } catch (e) {
            // catch errors...
            // 11000 = entry already exists
            const error = (e.code === 11000) ? 'Artist already exists' : e.message
            return res.status(400).send({ error })
        }
    }

    /**
     * Update artist
     */
    updateArtist = async (req, res, next) => {
        // get data transfer object from request body
        const dto = req.body
        logger.info(dto)

        try {
            // update new artist
            const artist = await this.artistService.update(req.params.slug, dto)
            if (!artist) return res.status(404).send({ error: 'Artist not found' })

            return res.json(artist)
        } catch (e) {
            // catch errors...
            return res.status(400).send({ error: e.message })
        }
    }

    /**
     * Delete artist
     */
    deleteArtist = async (req, res, next) => {
        try {
            // try to delete song
            const artist = await this.artistService.delete(req.params.slug)
            if (!artist) return res.status(404).send({ error: 'Artist not found' })

            return res.json(artist)
        } catch (e) {
            // catch errors...
            return res.status(400).send({ error: e.message })
        }
    }
}


export default ArtistsController