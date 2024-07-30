
const Joi = require('joi');

const registerSchema =  Joi.object().keys({
    FirstName: Joi.string().trim().required(),
    LastName: Joi.string().trim().optional(),
    Mobile: Joi.string().required(),
    EmailId: Joi.string().email().required(),
    CreatedDate: Joi.date().default(Date.now),
    UpdatedDate: Joi.date().default(Date.now),
    IsDeleted: Joi.boolean().default(false)

    })


module.exports = {
    registerSchema,
  
};
