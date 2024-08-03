const mongoose = require('mongoose')
 
const policySchema = mongoose.Schema({
    PolicyName: String,
    CreatedDate: {
        type: Date,
        default: Date.now()
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }

},)

const policy = mongoose.model('Policy', policySchema)

module.exports = policy