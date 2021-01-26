import mongoose from 'mongoose'
import slugify from 'slugify'
const { Schema } = mongoose
import Joi from 'joi'

// create schema
const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Artist name required'],
        min: 2,
        max: 50,
        unique: true
    },
    slug: {
        type: String,
        required: [true, 'Artist slug required'],
        unique: true
    },
    image: {
        type: String,
        required: false,
    },
    songs: [{
        _id: {
            type: mongoose.ObjectId,
            ref: 'Song'
        },
        title: {
            type: String,
            required: true
        }
    }]
})

// Use schema middleware to create the slug on validate
schema.pre('validate', function (next) {
    this.slug = slugify(this.name)
    next()
});

export const validate = (dto) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        image: Joi.string().min(10).max(255)
    })

    const { error } = schema.validate(dto)
    return error
}

export const Artist = mongoose.model('Artist', schema)