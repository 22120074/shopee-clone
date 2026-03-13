const multer = require("multer");
const upload = require("../middleware/upload");

exports.errorHandler = (err, req, res, next) => {
  console.error(">>> ERROR LOG:", {
    status: err.statusCode,
    message: err.message,
    stack: err.stack,
  });
  let statusCode = err.statusCode || 500;
  let message = err.message || "Lỗi hệ thống nội bộ. Vui lòng thử lại sau.";

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Dữ liệu đã tồn tại trong hệ thống.";
  }
  const response = {
    success: false,
    message: message,
  };
  res.status(statusCode).json(response);
};

exports.uploadSingleMiddleware = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        err.statusCode = 400;
        err.message = `Lỗi Multer: ${err.message}`;
      }
      return next(err);
    }
    next();
  });
};

exports.uploadArrayMiddleware = (req, res, next) => {
  upload.array("images", 10)(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        err.statusCode = 400;
        err.message = `Lỗi Multer: ${err.message}`;
      }
      return next(err);
    }
    next();
  });
};
