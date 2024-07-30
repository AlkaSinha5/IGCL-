const mongoose = require('mongoose')
 
const userSchema = mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        trim: true
    },
    LastName: {
        type: String,
        trim: true
    },
    Mobile: {
        type: String,
        required: true,
        unique:true,
    },
    CreatedDate: {
        type: Date,
        default: Date.now()
    },
    UpdatedDate: {
        type: Date,
        default: Date.now()
    },
    IsDeleted: {
        type: Boolean,
        default: false
    },
    EmailId: {
        type: String,
        required: true,
        lowercase: true,
        unique:true,
    },

},)

const User = mongoose.model('User', userSchema)

module.exports = User