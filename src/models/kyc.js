const mongoose = require('mongoose');

const kycSchema = new mongoose.Schema({
    ActName: {
        type: String,
        required: true 
    },
    EmployeeCount: {
        type: Number,
        required: true 
    },
    State: {
        type: String,
        required: true 
    },
    Other: {
        type: String,
        required: true 
    },
    ComplianceFrequency: {
        type: String,
        required: true 
    },
    To: {
        type: String,
        required: true 
    },
    CreatedDate: {
        type: Date,
        default: Date.now
    },
    IsDeleted: {
        type: Boolean,
        default: false
    }
});

const KYC = mongoose.model('KYC', kycSchema);

module.exports = KYC;
