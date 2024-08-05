const express = require('express')
const { addAbstract, getAllAbstract, getAbstractById, updateAbstract, deleteAbstract } = require('../controllers/abstract')
const router = express.Router()
const auth = require('../middleware/auth');


router.post('/add',auth,addAbstract)
router.get('/allAbstract',getAllAbstract)
router.get('/AbstractById/:id',auth,getAbstractById)
router.patch('/updateAbstract/:id',auth,updateAbstract)
router.delete('/deleteAbstract/:id',auth,deleteAbstract)


 

module.exports = router