// middlewares/errorHandler.js
module.exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error. Vui lòng thử lại sau.' });
};
