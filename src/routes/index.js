import artistRouter from './artists.js'
import songRouter from './songs.js'

export default {
    artists: {
        prefix: artistRouter.prefix,
        router: artistRouter.router
    },
    songs: {
        prefix: songRouter.prefix,
        router: songRouter.router
    },
    // setItems: {
    //     prefix: setItemRouter.prefix,
    //     router: setItemRouter.router
    // },
    // sets: {
    //     prefix: setRouter.prefix,
    //     router: setRouter.router
    // }
}