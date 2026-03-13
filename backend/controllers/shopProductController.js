const { addProduct } = require("../services/productShop.service");
const { BadRequest } = require("../utils/appErrors");
const { Created } = require("../utils/responseHelper");

const createProduct = async (req, res, next) => {
  try {
    const { product, detail, attributes, imagesData } = req.body;

    if (!product || !product.name || !product.fromStore) {
      throw BadRequest(
        "Thông tin sản phẩm không đầy đủ (Thiếu name hoặc fromStore).",
      );
    }
    if (!imagesData || !Array.isArray(imagesData) || imagesData.length === 0) {
      throw BadRequest("Sản phẩm bắt buộc phải có ít nhất một hình ảnh.");
    }

    const productData = {
      name: product.name,
      favorite: product.favorite || false,
      discount: product.discount || 0,
      attributeName: product.attributeName,
      fromStore: product.fromStore,
      category: product.category,
    };
    const newProduct = await addProduct(
      productData,
      detail,
      attributes,
      imagesData,
    );
    return Created(res, newProduct, "Tạo sản phẩm mới thành công!");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
};
