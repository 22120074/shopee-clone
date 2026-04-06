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

    // Lấy IP thực của client thay vì hardcode 127.0.0.1
    let ipAddr = req.headers["x-forwarded-for"] || req.ip || "127.0.0.1";
    if (ipAddr.includes(",")) ipAddr = ipAddr.split(",")[0].trim();
    if (ipAddr.includes("::ffff:")) ipAddr = ipAddr.replace("::ffff:", "");

    req.body.ipAddr = ipAddr;

    // req.body.ipAddr = "113.185.79.164";

    const paymentUrl = createPaymentUrl(req);

    return Success(res, { url: paymentUrl }, "Tạo link thanh toán thành công!");
  } catch (error) {
    next(error);
  }
};

// [GET] Xử lý URL trả về sau khi thanh toán xong (Dành cho Frontend)
exports.vnpayReturn = async (req, res, next) => {
  try {
    let vnp_Params = req.query;

    // Hàm này sẽ kiểm tra chữ ký bảo mật (xem phần Service bổ sung bên dưới)
    const isValidSignature = verifyReturnUrl(vnp_Params);

    if (isValidSignature) {
      if (vnp_Params["vnp_ResponseCode"] === "00") {
        // Giao dịch thành công
        // Lưu ý: Thường ở Return URL ta chỉ render ra trang báo thành công/thất bại cho user xem
        // Việc update trạng thái database (đã thanh toán) nên làm ở hàm IPN bên dưới.
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

// [GET] Xử lý IPN (VNPAY gọi ngầm vào API này để cập nhật DB)
// exports.vnpayIpn = async (req, res, next) => {
//   try {
//     let vnp_Params = req.query;
//     let secureHash = vnp_Params["vnp_SecureHash"];

//     // 1. Kiểm tra chữ ký (Checksum)
//     const isValidSignature = verifyReturnUrl(vnp_Params);

//     if (!isValidSignature) {
//       return res
//         .status(200)
//         .json({ RspCode: "97", Message: "Checksum failed" });
//     }

//     let orderId = vnp_Params["vnp_TxnRef"];
//     let vnp_Amount = vnp_Params["vnp_Amount"];
//     let rspCode = vnp_Params["vnp_ResponseCode"];

//     // 2. Tìm đơn hàng trong Database
//     const order = await getOrderById(orderId);
//     if (!order) {
//       return res
//         .status(200)
//         .json({ RspCode: "01", Message: "Order not found" });
//     }

//     // 3. Kiểm tra số tiền (VNPAY gửi về số tiền đã nhân 100)
//     // Giả sử totalPrice của bạn lưu là 100000 (VND), VNPAY sẽ trả về 10000000
//     const checkAmount = order.totalPrice * 100 === Number(vnp_Amount);
//     if (!checkAmount) {
//       return res.status(200).json({ RspCode: "04", Message: "Invalid amount" });
//     }

//     // 4. Kiểm tra trạng thái đơn hàng (Chỉ cập nhật nếu đơn hàng đang ở trạng thái chờ)
//     // Giả sử trạng thái chờ của bạn là 'PENDING'
//     if (order.status !== "PENDING") {
//       return res
//         .status(200)
//         .json({ RspCode: "02", Message: "Order already confirmed" });
//     }

//     // 5. Cập nhật trạng thái dựa vào ResponseCode của VNPAY
//     if (rspCode === "00") {
//       // Thanh toán thành công -> Cập nhật status thành 'PAID' (hoặc 'SUCCESS')
//       await updateOrderStatus(orderId, "PAID");
//     } else {
//       // Thanh toán thất bại hoặc bị hủy -> Cập nhật status thành 'FAILED'
//       await updateOrderStatus(orderId, "FAILED");
//     }

//     // Trả về kết quả thành công cho VNPAY để họ không gọi lại IPN nữa
//     return res.status(200).json({ RspCode: "00", Message: "Confirm Success" });
//   } catch (error) {
//     console.error("VNPAY IPN Error:", error);
//     return res.status(200).json({ RspCode: "99", Message: "Unknown error" });
//   }
// };

exports.vnpayIpn = async (req, res, next) => {
  try {
    let vnp_Params = req.query;

    // 1. Kiểm tra chữ ký (Checksum)
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

    // 2. Tìm đơn hàng trong Database
    const order = await getOrderById(orderId);
    if (!order) {
      console.error(`❌ ERROR: Order with ID ${orderId} not found in Database`);
      return res
        .status(200)
        .json({ RspCode: "01", Message: "Order not found" });
    }

    // 3. Kiểm tra số tiền (VNPAY gửi về số tiền đã nhân 100)
    // Lưu ý: Cần ép kiểu Number cho chính xác
    const dbAmount = Number(order.totalPrice) * 100;
    const vnpAmountReceived = Number(vnp_Amount);

    if (dbAmount !== vnpAmountReceived) {
      console.error("❌ ERROR: Amount mismatch!");
      return res.status(200).json({ RspCode: "04", Message: "Invalid amount" });
    }

    // 4. Kiểm tra trạng thái đơn hàng
    if (order.status !== "PENDING") {
      console.warn("⚠️ WARNING: Order already processed (Status not PENDING)");
      return res
        .status(200)
        .json({ RspCode: "02", Message: "Order already confirmed" });
    }

    // 5. Cập nhật trạng thái
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
