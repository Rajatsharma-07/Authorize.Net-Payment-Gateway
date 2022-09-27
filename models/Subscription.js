const mongoose = require('mongoose');

const SubsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan',
    },
    subscriptionId: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    customerProfileId: {
        type: String,
        required: true,
    },
    customerPaymentProfileId: {
        type: String,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    limitUsed: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
});

module.exports = Subs = mongoose.model('subs', SubsSchema);