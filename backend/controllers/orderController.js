const { createMultiItemOrder } = require("../services/order.service");
const {
  createPaymentUrl,
  verifyReturnUrl,
  getOrderById,
  updateOrderStatus,
} = require("../services/order.service");
const { Success } = require("../utils/responseHelper");
const { BadRequest } = require("../utils/appErrors");

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.userId;
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

exports.createVNPayUrl = async (req, res, next) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || amount <= 0) {
      throw BadRequest("Số tiền thanh toán không hợp lệ.");
    }

    if (!orderId) {
      throw BadRequest("Mã đơn hàng không hợp lệ.");
    }

    let ipAddr = req.headers["x-forwarded-for"] || req.ip || "127.0.0.1";
    if (ipAddr.includes(",")) ipAddr = ipAddr.split(",")[0].trim();
    if (ipAddr.includes("::ffff:")) ipAddr = ipAddr.replace("::ffff:", "");

    req.body.ipAddr = ipAddr;

    const paymentUrl = createPaymentUrl(req);

    return Success(res, { url: paymentUrl }, "Tạo link thanh toán thành công!");
  } catch (error) {
    next(error);
  }
};

exports.vnpayReturn = async (req, res, next) => {
  try {
    let vnp_Params = req.query;

    const isValidSignature = verifyReturnUrl(vnp_Params);

    if (isValidSignature) {
      if (vnp_Params["vnp_ResponseCode"] === "00") {
        return Success(res, vnp_Params, "Giao dịch thành công");
      } else {
        throw BadRequest("Giao dịch thất bại hoặc bị hủy.");
      }
    } else {
      throw BadRequest("Chữ ký không hợp lệ. Giao dịch có thể đã bị giả mạo.");
    }
  } catch (error) {
    next(error);
  }
};

exports.vnpayIpn = async (req, res, next) => {
  try {
    let vnp_Params = req.query;

    const isValidSignature = verifyReturnUrl(vnp_Params);

    if (!isValidSignature) {
      console.error(
        "❌ ERROR: Checksum failed - Secret Key might be wrong or Params tampered",
      );
      return res
        .status(200)
        .json({ RspCode: "97", Message: "Checksum failed" });
    }

    let orderId = vnp_Params["vnp_TxnRef"];
    let vnp_Amount = vnp_Params["vnp_Amount"];
    let rspCode = vnp_Params["vnp_ResponseCode"];

    const order = await getOrderById(orderId);
    if (!order) {
      console.error(`❌ ERROR: Order with ID ${orderId} not found in Database`);
      return res
        .status(200)
        .json({ RspCode: "01", Message: "Order not found" });
    }

    const dbAmount = Number(order.totalPrice) * 100;
    const vnpAmountReceived = Number(vnp_Amount);

    if (dbAmount !== vnpAmountReceived) {
      console.error("❌ ERROR: Amount mismatch!");
      return res.status(200).json({ RspCode: "04", Message: "Invalid amount" });
    }

    // Kiểm tra trạng thái đơn hàng
    if (order.status !== "PENDING") {
      console.warn("⚠️ WARNING: Order already processed (Status not PENDING)");
      return res
        .status(200)
        .json({ RspCode: "02", Message: "Order already confirmed" });
    }

    // Cập nhật trạng thái
    if (rspCode === "00") {
      await updateOrderStatus(orderId, "PAID");
    } else {
      await updateOrderStatus(orderId, "FAILED");
    }

    return res.status(200).json({ RspCode: "00", Message: "Confirm Success" });
  } catch (error) {
    console.error("🔥 CRITICAL ERROR in VNPAY IPN:", error);
    return res.status(200).json({ RspCode: "99", Message: "Unknown error" });
  }
};
