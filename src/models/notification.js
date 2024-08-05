const mongoose = require('mongoose')
 
const notificationSchema = mongoose.Schema({
    PolicyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy'
    },
    Title:String,
    Description:String,
    CreatedDate: {
        type: Date,
        default: Date.now()
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }

},)

const notification = mongoose.model('Notification', notificationSchema)

module.exports = notification