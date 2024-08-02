const mongoose = require('mongoose')
 
const clientSchema = mongoose.Schema({
    Name: String,
    Image:String,
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

const client = mongoose.model('Client', clientSchema)

module.exports = client