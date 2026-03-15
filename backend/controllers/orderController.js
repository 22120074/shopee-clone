const { createMultiItemOrder } = require("../services/order.service");
const { Success } = require("../utils/responseHelper");
const { BadRequest } = require("../utils/appErrors");

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw BadRequest("Giỏ hàng của bạn đang trống.");
    }

    const order = await createMultiItemOrder(userId, items);

    return Success(res, order, "Đặt hàng thành công!");
  } catch (error) {
    next(error);
  }
};
