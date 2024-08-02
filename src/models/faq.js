const mongoose = require('mongoose')
 
const faqSchema = mongoose.Schema({
    Question: String,
    Answer:String,
    CreatedDate: {
        type: Date,
        default: Date.now()
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }

},)

const faq = mongoose.model('FAQ', faqSchema)

module.exports = faq