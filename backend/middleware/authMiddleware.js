// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const { Unauthorized } = require("../utils/appErrors");

exports.protect = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    console.log("Token: ", token);
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

exports.noCacheMiddleware = (req, res, next) => {
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next(); // Đi tiếp vào controller xử lý logic
};
