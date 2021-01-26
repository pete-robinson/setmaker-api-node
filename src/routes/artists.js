import Router from 'express'
import ArtistsController from '../controllers/artistsController.js'
import ArtistService from '../services/ArtistService.js'

const router = Router()
const prefix = 'artists'

const controller = new ArtistsController(ArtistService)

/* GET artists listing. */
router.get('/', controller.getArtists)

/* GET single artist */
router.get('/:slug', controller.getArtist)

/* POST create artist */
router.post('/', controller.createArtist)

/* PUT update artist */
router.put('/:slug', controller.updateArtist)

/* DELETE artist */
router.delete('/:slug', controller.deleteArtist)


export default { prefix, router }