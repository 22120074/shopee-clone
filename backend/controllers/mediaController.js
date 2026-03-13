const { BadRequest } = require("../utils/appErrors");
const { Success } = require("../utils/responseHelper");

const uploadSingleImage = (req, res, next) => {
  try {
    if (!req.file) {
      throw BadRequest("Không có file nào được tải lên");
    }

    return Success(
      res,
      {
        url: req.file.path,
        public_id: req.file.filename,
        size: req.file.size,
      },
      "Tải lên thành công!",
    );
  } catch (error) {
    next(error);
  }
};

const uploadMultipleImages = (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw BadRequest("Không có file nào được tải lên");
    }

    const urls = req.files.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));

    return Success(res, urls, "Tải lên nhiều ảnh thành công!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
};
