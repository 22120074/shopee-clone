const multer = require('multer');
const upload = require('../middleware/upload');

exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server error. Vui lòng thử lại sau.";
  res.status(statusCode).json({ message });
};

exports.uploadSingleMiddleware = (req, res, next) => {
  upload.single('image')(req, res, (err) => {
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
  upload.array('images', 10)(req, res, (err) => {
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