const uploadSingleImage = (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file nào được tải lên' });
    }

    res.status(200).json({
      message: 'Tải lên thành công!',
      data: {
        url: req.file.path,
        public_id: req.file.filename,
        size: req.file.size
      }
    });
  } catch (error) {
    next(error);
  }
};

const uploadMultipleImages = (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Không có file nào được tải lên' });
    }

    const urls = req.files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));

    res.status(200).json({
      message: 'Tải lên nhiều ảnh thành công!',
      data: urls
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages
};