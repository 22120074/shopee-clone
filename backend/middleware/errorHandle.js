const multer = require("multer");
const upload = require("../middleware/upload");

exports.errorHandler = (err, req, res, next) => {
  console.error(">>> ERROR LOG:", {
    status: err.statusCode,
    message: err.message,
    metadata: err.metadata,
    stack: err.stack,
  });
  let statusCode = err.statusCode || 500;
  let message = err.message || "Lỗi hệ thống nội bộ. Vui lòng thử lại sau.";
  let data = err.metadata || null;

  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Dữ liệu đã tồn tại trong hệ thống.";
  }
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }
  const response = {
    success: false,
    message: message,
    statusCode: statusCode,
  };
  if (data) {
    response.data = data;
  }
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
