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
    console.log("=== [VNPAY CONTROLLER] START CREATE URL ===");
    console.log("1. Received Request Body:", JSON.stringify(req.body, null, 2));
    console.log("2. User ID from Token:", req.user.userId);
    const { amount, orderId } = req.body;

    if (!amount || amount <= 0) {
      throw BadRequest("Số tiền thanh toán không hợp lệ.");
    }

    if (!orderId) {
      throw BadRequest("Mã đơn hàng không hợp lệ.");
    }

    // Lấy IP thực của client thay vì hardcode 127.0.0.1
    // req.body.ipAddr =
    //   req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    req.body.ipAddr = "113.185.79.164";

    // Gọi hàm ở tầng service bạn đã viết
    const paymentUrl = createPaymentUrl(req);

    // Trả về URL để Frontend thực hiện redirect
    return Success(res, { url: paymentUrl }, "Tạo link thanh toán thành công!");
  } catch (error) {
    next(error);
  }
};

// [GET] Xử lý URL trả về sau khi thanh toán xong (Dành cho Frontend)
exports.vnpayReturn = async (req, res, next) => {
  try {
    console.log("=== [VNPAY RETURN] START PROCESSING RETURN URL ===");
    console.log(
      "1. Received Query Params:",
      JSON.stringify(req.query, null, 2),
    );
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
  console.log("=== [VNPAY IPN] START RECEIVING REQUEST ===");
  try {
    let vnp_Params = req.query;
    console.log("1. Received Params:", JSON.stringify(vnp_Params, null, 2));

    // 1. Kiểm tra chữ ký (Checksum)
    const isValidSignature = verifyReturnUrl(vnp_Params);
    console.log("2. Signature Verification Result:", isValidSignature);

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

    console.log(
      `3. Processing OrderId: ${orderId}, Amount: ${vnp_Amount}, RspCode: ${rspCode}`,
    );

    // 2. Tìm đơn hàng trong Database
    const order = await getOrderById(orderId);
    if (!order) {
      console.error(`❌ ERROR: Order with ID ${orderId} not found in Database`);
      return res
        .status(200)
        .json({ RspCode: "01", Message: "Order not found" });
    }
    console.log("4. Found Order in DB:", JSON.stringify(order, null, 2));

    // 3. Kiểm tra số tiền (VNPAY gửi về số tiền đã nhân 100)
    // Lưu ý: Cần ép kiểu Number cho chính xác
    const dbAmount = Number(order.totalPrice) * 100;
    const vnpAmountReceived = Number(vnp_Amount);

    console.log(
      `5. Comparing Amounts: DB(${dbAmount}) vs VNPAY(${vnpAmountReceived})`,
    );

    if (dbAmount !== vnpAmountReceived) {
      console.error("❌ ERROR: Amount mismatch!");
      return res.status(200).json({ RspCode: "04", Message: "Invalid amount" });
    }

    // 4. Kiểm tra trạng thái đơn hàng
    console.log(`6. Current DB Order Status: ${order.status}`);
    if (order.status !== "PENDING") {
      console.warn("⚠️ WARNING: Order already processed (Status not PENDING)");
      return res
        .status(200)
        .json({ RspCode: "02", Message: "Order already confirmed" });
    }

    // 5. Cập nhật trạng thái
    if (rspCode === "00") {
      console.log("✅ SUCCESS: Updating status to PAID...");
      await updateOrderStatus(orderId, "PAID");
      console.log("🎉 SUCCESS: DB updated successfully!");
    } else {
      console.log(
        `❌ FAILED: VNPAY returned error code ${rspCode}. Updating status to FAILED...`,
      );
      await updateOrderStatus(orderId, "FAILED");
    }

    console.log("=== [VNPAY IPN] END - RESPONSE SENT: 00 ===");
    return res.status(200).json({ RspCode: "00", Message: "Confirm Success" });
  } catch (error) {
    console.error("🔥 CRITICAL ERROR in VNPAY IPN:", error);
    return res.status(200).json({ RspCode: "99", Message: "Unknown error" });
  }
};
