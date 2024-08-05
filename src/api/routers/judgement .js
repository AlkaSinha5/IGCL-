const express = require('express')
const { addJudgement, getAllJudgement, getJudgementById, updateJudgement, deleteJudgement } = require('../controllers/judgement ')
const auth = require('../middleware/auth');
const router = express.Router()


router.post('/add',auth,addJudgement)
router.get('/allJudgement',getAllJudgement)
router.get('/JudgementById/:id',auth,getJudgementById)
router.patch('/updateJudgement/:id',auth,updateJudgement)
router.delete('/deleteJudgement/:id',auth,deleteJudgement)
 

module.exports = router