const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [],
    totalQuantity: { 
        type: Number, 
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { 
    timestamps: true,
    collection: 'carts'
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
