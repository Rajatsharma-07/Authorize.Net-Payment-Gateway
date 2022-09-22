const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    planId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'plan'
    },
    totalAmount: {
        type: String,
    }
});

module.exports = Cart = mongoose.model('cart', CartSchema);