class AppError extends Error {
  constructor(message, statusCode, metadata = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.metadata = metadata;
    Error.captureStackTrace(this, this.constructor);
  }
}

const BadRequest = (msg = "Yêu cầu không hợp lệ", metadata = null) =>
  new AppError(msg, 400, metadata);
const Unauthorized = (msg = "Chưa xác thực quyền") => new AppError(msg, 401);
const Forbidden = (msg = "Không có quyền truy cập") => new AppError(msg, 403);
const NotFound = (msg = "Không tìm thấy tài nguyên") => new AppError(msg, 404);
const InternalServer = (msg = "Lỗi hệ thống") => new AppError(msg, 500);
const Conflict = (msg = "Dữ liệu đã tồn tại") => new AppError(msg, 409);

module.exports = {
  AppError,
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServer,
  Conflict,
};
