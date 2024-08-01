const Joi = require('joi');

const testimonialSchema =  Joi.object().keys({
    Name: Joi.string(),
    Image: Joi.number(),
    Message:Joi.string(),

    })

    module.exports = {
        testimonialSchema
    };