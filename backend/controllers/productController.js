const {
  getAllProduct,
  getOneProduct,
  isLikedByUser,
  addLikeProduct,
  removeLikeProduct,
  getAllProductReviews,
  getReviewsByRating,
  getReviewsWithMedia,
  getEachNumofTypeRating,
} = require("../services/product.service");
const { Success } = require("../utils/responseHelper");
const { BadRequest } = require("../utils/appErrors");

// module.exports.getAllProduct = async (req, res) => {
//     try {
//         const limit = parseInt(req.query.limit) || 48;
//         const products = await Product.find({}).sort({ createdAt: -1 }).limit(limit);
//         res.status(200).json(products);
//     } catch (error) {
//         console.error('Lỗi lấy tất cả sản phẩm:', error);
//         next(error);
//     }
// }

module.exports.getProduct = async (req, res, next) => {
  try {
    const { productID } = req.query;
    const product = await getOneProduct(productID);
    return Success(res, product, "Lấy chi tiết sản phẩm thành công");
  } catch (error) {
    next(error);
  }
};

module.exports.getAllProduct = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 48;
    const products = await getAllProduct(limit);
    return Success(res, products, "Lấy danh sách sản phẩm thành công");
  } catch (error) {
    next(error);
  }
};

module.exports.isLikedProduct = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { productID } = req.query;
    const liked = await isLikedByUser(productID, userId);
    return Success(res, { liked }, "Kiểm tra yêu thích thành công");
  } catch (error) {
    next(error);
  }
};

module.exports.likeProduct = async (req, res, next) => {
  try {
    const { productID, userID } = req.body;
    await addLikeProduct(productID, userID);
    return Success(res, null, "Sản phẩm đã được thêm vào yêu thích");
  } catch (error) {
    next(error);
  }
};

module.exports.unlikeProduct = async (req, res, next) => {
  try {
    const { productID, userID } = req.body;
    await removeLikeProduct(productID, userID);
    return Success(res, null, "Đã bỏ yêu thích sản phẩm");
  } catch (error) {
    next(error);
  }
};

module.exports.getReviews = async (req, res, next) => {
  try {
    const { productID, limit, page, typeSort } = req.query;
    let reviews;
    switch (typeSort) {
      case "all":
        reviews = await getAllProductReviews(productID, limit, page);
        break;
      case "5":
      case "4":
      case "3":
      case "2":
      case "1":
        reviews = await getReviewsByRating(
          productID,
          limit,
          page,
          parseInt(typeSort),
        );
        break;
      case "image_video":
        reviews = await getReviewsWithMedia(productID, limit, page);
        break;
      default:
        reviews = await getAllProductReviews(productID, limit, page);
        break;
    }
    return Success(res, reviews, "Lấy danh sách đánh giá thành công");
  } catch (error) {
    next(error);
  }
};

module.exports.getEachNumofTypeRating = async (req, res, next) => {
  try {
    const { productID } = req.query;
    const ratings = await getEachNumofTypeRating(productID);
    return Success(res, ratings, "Lấy thống kê đánh giá thành công");
  } catch (error) {
    next(error);
  }
};
