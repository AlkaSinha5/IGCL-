const Joi = require('joi');

const clientSchema =  Joi.object().keys({
    Name: Joi.string(),
    Image: Joi.string(),
    Description:Joi.string(),

    })

    module.exports = {
        clientSchema
    };