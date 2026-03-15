const cloudinary = require("cloudinary").v2;

const deleteSingleImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log("Xóa ảnh thành công!");
    } else {
      console.log("Không tìm thấy ảnh hoặc ID sai:", result.result);
    }
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  deleteSingleImage,
};
