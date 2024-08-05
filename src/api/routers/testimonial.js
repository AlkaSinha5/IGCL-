const express = require('express')
const router = express.Router()
const { validate } = require('../../helper/customValidation');
const { addtestimonial, getAlltestimonial, updatetestimonial, deletetestimonial, gettestimonialById } = require('../controllers/testimonial');
const { testimonialSchema } = require('../validators/testimonial');
const auth = require('../middleware/auth');


router.post('/add',auth,validate(testimonialSchema,'body'),addtestimonial)
router.get('/allTestimonial',getAlltestimonial)
router.get('/testimonialById/:id',auth,gettestimonialById)
router.patch('/updateTestimonial/:id',auth,updatetestimonial)
router.delete('/deleteTestimonial/:id',auth,deletetestimonial)


 

module.exports = router