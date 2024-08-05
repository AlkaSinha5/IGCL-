const express = require('express')
const router = express.Router()
const { validate } = require('../../helper/customValidation');
const { clientSchema } = require('../validators/client');
const { addClient, getAllClient, getClientById, updateClient, deleteClient } = require('../controllers/client');
const auth = require('../middleware/auth');

router.post('/add',auth,validate(clientSchema,'body'),addClient)
router.get('/allClient',getAllClient)
router.get('/ClientById/:id',auth,getClientById)
router.patch('/updateClient/:id',auth,updateClient)
router.delete('/deleteClient/:id',auth,deleteClient)

module.exports = router