const express = require('express')
const { addAbstract, getAllAbstract, getAbstractById, updateAbstract, deleteAbstract } = require('../controllers/abstract')
const router = express.Router()


router.post('/add',addAbstract)
router.get('/allAbstract',getAllAbstract)
router.get('/AbstractById/:id',getAbstractById)
router.patch('/updateAbstract/:id',updateAbstract)
router.delete('/deleteAbstract/:id',deleteAbstract)


 

module.exports = router