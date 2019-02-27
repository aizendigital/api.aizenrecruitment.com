const joi = require('joi')


module.exports = function  validate(user){

    const schema = {
        name: joi.string().min(2).max(128).required(),
        email: joi.string().required().email().max(128),
        company: joi.string().min(0),
        positionhire: joi.string().min(0),
        positiontype: joi.string().min(0),
        phone: joi.number(),
        comment: joi.string().min(0)
    }
    return joi.validate(user, schema)
}
