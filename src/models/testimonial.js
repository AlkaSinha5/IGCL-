const mongoose = require('mongoose')
 
const testimonialSchema = mongoose.Schema({
    Name: String,
    Image:String,
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

const testimonial = mongoose.model('Testimonial', testimonialSchema)

module.exports = testimonial