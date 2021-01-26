import mongoose from 'mongoose'
const { Schema } = mongoose
import Joi from 'joi'

// tonality enum
const tonalities = [ 'major', 'minor', 'mixed' ]

// create schema
const schema = new Schema({
    title: {
        type: String,
        required: [true, 'Song title required'],
        min: 1,
        max: 50
    },
    artist: {
        type: mongoose.ObjectId,
        ref: 'Artist',
        required: [true, 'Artist is required']
    },
    key: {
        type: String,
        min: 1,
        max: 100,
        required: false,
    },
    tonality: {
        type: String,
        enum: tonalities
    }
})

export const validate = (dto) => {
    const schema = Joi.object({
        title: Joi.string().min(1).max(50).required(),
        artistId: Joi.objectId().required(),
        key: Joi.string().min(1).max(100),
        tonality: Joi.string().valid('major', 'minor', 'mixed')
    })

    const { error } = schema.validate(dto)
    return error
}

export const Song = mongoose.model('Song', schema)