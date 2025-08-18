const Cart = require('../models/Cart');

const checkExistingCart = async (userId) => {
    return await Cart.exists({ userId });
};

const createCart = async (userId, items, totalQuantity, totalPrice) => {
    const cart = new Cart({ userId, items, totalQuantity, totalPrice });
    return await cart.save();
};

const getCartByUserId = async (userId) => {
    return await Cart.findOne({ userId });
};

const updateCart = async (userId, updateData) => {
    return await Cart.findOneAndUpdate({ userId }, updateData, { new: true });
};

const deleteCart = async (userId) => {
    return await Cart.findOneAndDelete({ userId });
};

module.exports = {
    createCart,
    getCartByUserId,
    updateCart,
    deleteCart,
    checkExistingCart
};
