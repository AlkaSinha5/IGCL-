const mongoose = require('mongoose')
 
const contactSchema = mongoose.Schema({
    Name: String,
    Mobile: Number,
    Email: String,
    Message:String,
    CreatedDate: {
        type: Date,
        default: Date.now()
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }

},)

const contact = mongoose.model('Contact', contactSchema)

module.exports = contact