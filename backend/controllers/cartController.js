const { createCartByUserId, createCartByGoogleId, getCartByUserId, updateCartByUserId, deleteCart, checkExistingCart, getCartByGoogleId,
    checkExistingCartByGoogleId, updateCartByGoogleId } = require('../services/cart.service');
const mongoose = require("mongoose");

module.exports.createOrUpdateCart = async (req, res) => {
    const { userId, items, totalQuantity, totalPrice } = req.body;
    try {
        if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
            if (await checkExistingCartByGoogleId(userId)) {
                const cart = await updateCartByGoogleId(userId, { items, totalQuantity, totalPrice });
                return res.status(200).json(cart);
            }
            const cart = await createCartByGoogleId(userId, items, totalQuantity, totalPrice);
            return res.status(201).json(cart);
        } else {
            if (await checkExistingCart(userId)) {
                const cart = await updateCartByUserId(userId, { items, totalQuantity, totalPrice });
                return res.status(200).json(cart);
            }
            const cart = await createCartByUserId(userId, items, totalQuantity, totalPrice);
            return res.status(201).json(cart);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports.getCart = async (req, res) => {
    const { userId } = req.query;
    try {
        let cart;
        if (typeof userId === "string" && !mongoose.Types.ObjectId.isValid(userId)) {
            cart = await getCartByGoogleId(userId);
        } else {
            cart = await getCartByUserId(userId);
        }
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
