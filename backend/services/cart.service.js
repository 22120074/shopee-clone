const Cart = require('../models/Mongoose/Cart');

const checkExistingCart = async (userId) => {
    return await Cart.exists({ userId });
};

const checkExistingCartByGoogleId = async (googleId) => {
    return await Cart.exists({ googleId });
}

const createCartByUserId = async (userId, items, totalQuantity, totalPrice) => {
    const cart = new Cart({ userId, items, totalQuantity, totalPrice });
    return await cart.save();
};

const createCartByGoogleId = async (googleId, items, totalQuantity, totalPrice) => {
    const cart = new Cart({ googleId, items, totalQuantity, totalPrice });
    return await cart.save();
};

const getCartByUserId = async (userId) => {
    return await Cart.findOne({ userId });
};

const getCartByGoogleId = async (googleId) => {
    return await Cart.findOne({ googleId });
};

const updateCartByUserId = async (userId, updateData) => {
    return await Cart.findOneAndUpdate({ userId }, updateData, { new: true });
};

const updateCartByGoogleId = async (googleId, updateData) => {
    return await Cart.findOneAndUpdate({ googleId }, updateData, { new: true });
};

const deleteCart = async (userId) => {
    return await Cart.findOneAndDelete({ userId });
};

module.exports = {
    createCartByUserId,
    createCartByGoogleId,
    getCartByUserId,
    updateCartByUserId,
    updateCartByGoogleId,
    deleteCart,
    checkExistingCart,
    getCartByGoogleId,
    checkExistingCartByGoogleId
};
