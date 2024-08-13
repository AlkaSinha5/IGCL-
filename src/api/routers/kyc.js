const express = require('express')
const router = express.Router()
const { validate } = require('../../helper/customValidation');
const auth = require('../middleware/auth');
const { addKYC, getAllKYC, getKYCById, updateKYC, deleteKYC } = require('../controllers/kyc');

router.post('/add',addKYC)
router.get('/allKYC',getAllKYC)
router.get('/KYCById/:id',getKYCById)
router.patch('/updateKYC/:id',updateKYC)
router.delete('/deleteKYC/:id',deleteKYC)


 

module.exports = router