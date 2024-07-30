const Joi = require('joi');

const contactSchema =  Joi.object().keys({
    Name: Joi.string().required(),
    Mobile: Joi.number(),
    Email: Joi.string().email().required(),
    Message:Joi.string().required(),

    })

    module.exports = {
        contactSchema
    };