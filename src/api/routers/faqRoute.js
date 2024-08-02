const express = require('express')
const router = express.Router()
const { validate } = require('../../helper/customValidation');
const { FAQSchema } = require('../validators/faq');
const { addFAQ, getAllFAQ, getFAQById, updateFAQ, deleteFAQ } = require('../controllers/faq');


router.post('/add',validate(FAQSchema,'body'),addFAQ)
router.get('/allFAQ',getAllFAQ)
router.get('/FAQById/:id',getFAQById)
router.patch('/updateFAQ/:id',updateFAQ)
router.delete('/deleteFAQ/:id',deleteFAQ)


 

module.exports = router