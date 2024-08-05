const mongoose = require('mongoose')
 
const judgementSchema = mongoose.Schema({
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

const judgement = mongoose.model('Judgement', judgementSchema)

module.exports = judgement