const Joi = require('joi');

const FAQSchema =  Joi.object().keys({
    Question: Joi.string(),
    Answer:Joi.string(),

    })

    module.exports = {
        FAQSchema
    };