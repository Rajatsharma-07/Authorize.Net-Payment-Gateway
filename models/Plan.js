const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    timePeriod: {
        type: Number,
        required: true,
    },
    isRecurring: {
        type: Boolean,
    },
    amount: {
        type: Number,
        required: true,
    },
    limit: {
        type: Number,
    }
});

module.exports = Plan = mongoose.model('plan', PlanSchema);