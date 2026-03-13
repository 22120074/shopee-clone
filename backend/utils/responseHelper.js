const sendSuccess = (res, data, message = "Thành công", statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const Success = (res, data, message) => sendSuccess(res, data, message, 200);
const Created = (res, data, message = "Tạo mới thành công") =>
  sendSuccess(res, data, message, 201);

module.exports = { Success, Created };
