const express = require('express')
const router = express.Router()
const { validate } = require('../../helper/customValidation');
const { addtestimonial, getAlltestimonial, updatetestimonial, deletetestimonial, gettestimonialById } = require('../controllers/testimonial');
const { testimonialSchema } = require('../validators/testimonial');


router.post('/add',validate(testimonialSchema,'body'),addtestimonial)
router.get('/allTestimonial',getAlltestimonial)
router.get('/testimonialById/:id',gettestimonialById)
router.patch('/updateTestimonial/:id',updatetestimonial)
router.delete('/deleteTestimonial/:id',deletetestimonial)


 

module.exports = router