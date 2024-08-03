const mongoose = require('mongoose')
 
const abstractSchema = mongoose.Schema({
    PolicyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy'
    },
    PDF: String,
    CreatedDate: {
        type: Date,
        default: Date.now()
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }

},)

const abstract = mongoose.model('Abstract', abstractSchema)

module.exports = abstract