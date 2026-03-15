// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../utils/appErrors");

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return next(
        Unauthorized("Phiên làm việc hết hạn. Vui lòng đăng nhập lại."),
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Lưu payload vào req.user
    req.user = { userId: decoded.userId, phone: decoded.phone };

    return next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(Unauthorized("Token đã hết hạn. Vui lòng đăng nhập lại."));
    }
    return next(Unauthorized("Token không hợp lệ."));
  }
};
