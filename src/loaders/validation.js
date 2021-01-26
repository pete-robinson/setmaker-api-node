import Joi from 'joi'
import joiObjectId from 'joi-objectid'

export default () => {
    Joi.objectId = joiObjectId(Joi)
}