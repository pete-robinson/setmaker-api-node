import routers from '../routes/index.js'
import error from '../middleware/error.js'

export default (app) => {
    /**
     * Init routing
     * useing a loop - keeps routing clean
     */
    for (const [k, v] of Object.entries(routers)) {
        app.use(`/${v.prefix}`, v.router);
    };

    /**
     * Global error handling
     */
    app.use(error)
}