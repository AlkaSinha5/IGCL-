const express = require('express')
const router = express.Router()
const { validate } = require('../../helper/customValidation');
const { FAQSchema } = require('../validators/faq');
const { addFAQ, getAllFAQ, getFAQById, updateFAQ, deleteFAQ } = require('../controllers/faq');
const auth = require('../middleware/auth');

router.post('/add',auth,validate(FAQSchema,'body'),addFAQ)
router.get('/allFAQ',getAllFAQ)
router.get('/FAQById/:id',auth,getFAQById)
router.patch('/updateFAQ/:id',auth,updateFAQ)
router.delete('/deleteFAQ/:id',auth,deleteFAQ)


 

module.exports = router