const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    cardNumber: {
        type: String,
        required: true,
    },
    expiryDate: {
        type: String,
        required: true,
    }
});

module.exports = Card = mongoose.model('Card', CardSchema);