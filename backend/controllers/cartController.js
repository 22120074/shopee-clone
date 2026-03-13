const {
  createCartByUserId,
  createCartByGoogleId,
  getCartByUserId,
  updateCartByUserId,
  deleteCart,
  checkExistingCart,
  getCartByGoogleId,
  checkExistingCartByGoogleId,
  updateCartByGoogleId,
} = require("../services/cart.service");
const mongoose = require("mongoose");
const { BadRequest } = require("../utils/appErrors");
const { Success, Created } = require("../utils/responseHelper");

module.exports.createOrUpdateCart = async (req, res, next) => {
  const { userId, items, totalQuantity, totalPrice } = req.body;
  try {
    if (
      typeof userId === "string" &&
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      if (await checkExistingCartByGoogleId(userId)) {
        const cart = await updateCartByGoogleId(userId, {
          items,
          totalQuantity,
          totalPrice,
        });
        return Success(res, cart, "Cập nhật giỏ hàng Google thành công");
      }
      const cart = await createCartByGoogleId(
        userId,
        items,
        totalQuantity,
        totalPrice,
      );
      return Created(res, cart, "Tạo giỏ hàng Google thành công");
    } else {
      if (await checkExistingCart(userId)) {
        const cart = await updateCartByUserId(userId, {
          items,
          totalQuantity,
          totalPrice,
        });
        return Success(res, cart, "Cập nhật giỏ hàng thành công");
      }
      const cart = await createCartByUserId(
        userId,
        items,
        totalQuantity,
        totalPrice,
      );
      return Created(res, cart, "Tạo giỏ hàng thành công");
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getCart = async (req, res, next) => {
  const { userId } = req.query;
  try {
    let cart;
    if (
      typeof userId === "string" &&
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      cart = await getCartByGoogleId(userId);
    } else {
      cart = await getCartByUserId(userId);
    }
    return Success(res, cart, "Lấy thông tin giỏ hàng thành công");
  } catch (error) {
    next(error);
  }
};
