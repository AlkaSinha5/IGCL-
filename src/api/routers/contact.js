const express = require('express')
 
const router = express.Router()
const { validate } = require('../../helper/customValidation');
 
 
// const auth = require('../middleware/auth');
const { addContact, getAllContact } = require('../controllers/contact');
const { contactSchema } = require('../validators/contact');


router.post('/addContact',validate(contactSchema,'body'),addContact)
router.get('/allContact',getAllContact)

 

module.exports = router