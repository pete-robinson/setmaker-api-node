import Router from 'express'
import SongsController from '../controllers/songsController.js'
import SongService from '../services/SongService.js'
import ArtistService from '../services/ArtistService.js'

const router = Router()
const prefix = 'songs'

const controller = new SongsController(SongService, ArtistService)

// /* GET songs listing. */
router.get('/', controller.getSongs)

/* GET songs by artist */
router.get('/artist/:id', controller.getSongsByArtist)

/* GET single song */
router.get('/:id', controller.getSong)

/* POST create song */
router.post('/', controller.createSong)

/* PUT update song */
router.put('/:id', controller.updateSong)

/* DELETE song */
router.delete('/:id', controller.deleteSong)


export default { prefix, router }