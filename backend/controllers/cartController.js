const { createCart, getCartByUserId, updateCart, deleteCart, checkExistingCart } = require('../services/cart.service');

module.exports.createOrUpdateCart = async (req, res) => {
    const { userId, items, totalQuantity, totalPrice } = req.body;
    try {
        if (await checkExistingCart(userId)) {
            const cart = await updateCart(userId, { items, totalQuantity, totalPrice });
            return res.status(200).json(cart);
        }
        const cart = await createCart(userId, items, totalQuantity, totalPrice);
        return res.status(201).json(cart);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports.getCart = async (req, res) => {
    const { userId } = req.query;
    try {
        const cart = await getCartByUserId(userId);
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
