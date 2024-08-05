const express = require('express')
const { addPolicy, getAllPolicy, getPolicyById, updatePolicy, deletePolicy } = require('../controllers/policy')
const router = express.Router()
const auth = require('../middleware/auth');


router.post('/add',auth,addPolicy)
router.get('/allPolicy',getAllPolicy)
router.get('/PolicyById/:id',auth,getPolicyById)
router.patch('/updatePolicy/:id',auth,updatePolicy)
router.delete('/deletePolicy/:id',auth,deletePolicy)


 

module.exports = router