const express = require('express')
const { addNotification, getAllNotification, getNotificationById, updateNotification, deleteNotification } = require('../controllers/notification')
const router = express.Router()
const auth = require('../middleware/auth');


router.post('/add',auth,addNotification)
router.get('/allNotification',getAllNotification)
router.get('/NotificationById/:id',auth,getNotificationById)
router.patch('/updateNotification/:id',auth,updateNotification)
router.delete('/deleteNotification/:id',auth,deleteNotification)
 

module.exports = router