const express = require('express')
const { addPolicy, getAllPolicy, getPolicyById, updatePolicy, deletePolicy } = require('../controllers/policy')
const router = express.Router()


router.post('/add',addPolicy)
router.get('/allPolicy',getAllPolicy)
router.get('/PolicyById/:id',getPolicyById)
router.patch('/updatePolicy/:id',updatePolicy)
router.delete('/deletePolicy/:id',deletePolicy)


 

module.exports = router