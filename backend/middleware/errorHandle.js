// middlewares/errorHandler.js
exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Server error. Vui lòng thử lại sau.";
  res.status(statusCode).json({ message });
};
