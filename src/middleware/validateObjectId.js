import mongoose from 'mongoose'

export const validObjectId = (req, res, next) => {
    if(typeof req.params.id !== undefined && !mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(404).send({ error: 'Invalid id' })
    
    if(typeof req.params.artistId !== undefined && !mongoose.Types.ObjectId.isValid(req.params.artistId))
        return res.status(404).send({ error: 'Invalid artist id' })
    
    if(typeof req.params.songId !== undefined && !mongoose.Types.ObjectId.isValid(req.params.songId))
        return res.status(404).send({ error: 'Invalid song id' })
    
    next()
}