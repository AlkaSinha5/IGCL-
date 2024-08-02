const express = require('express')
const router = express.Router()
const { validate } = require('../../helper/customValidation');
const { clientSchema } = require('../validators/client');
const { addClient, getAllClient, getClientById, updateClient, deleteClient } = require('../controllers/client');


router.post('/add',validate(clientSchema,'body'),addClient)
router.get('/allClient',getAllClient)
router.get('/ClientById/:id',getClientById)
router.patch('/updateClient/:id',updateClient)
router.delete('/deleteClient/:id',deleteClient)

module.exports = router