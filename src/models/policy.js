const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
    PolicyName: {
        type: String,
        required: true
    },
    PDF: {
        type: String,
        required: true
    },
    JudgmentTitle: {
        type: String,
        required: true
    },
    JudgmentDescription: {
        type: String,
        required: true
    },
    NotificationTitle: {
        type: String,
        required: true
    },
    NotificationDescription: {
        type: String,
        required: true
    },
    CreatedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    IsDeleted: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Policy = mongoose.model('Policy', policySchema);

module.exports = Policy;
