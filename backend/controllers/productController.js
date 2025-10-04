const { getAllProduct, getOneProduct, isLikedByUser, addLikeProduct, removeLikeProduct, 
    getAllProductReviews, getReviewsByRating, getReviewsWithMedia, getEachNumofTypeRating } = require('../services/product.service');

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
        res.status(200).json(product);
    } catch (error) {
        next(error);
        console.error('Lỗi lấy sản phẩm:', error);
    }
}

module.exports.getAllProduct = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 48;
        const products = await getAllProduct(limit);
        res.status(200).json(products);
    } catch (error) {
        console.error('Lỗi lấy tất cả sản phẩm:', error);
        next(error);
    }
};

module.exports.isLikedProduct = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { productID } = req.query;
        const liked = await isLikedByUser(productID, userId);
        res.status(200).json({ liked });
    } catch (error) {
        console.error('Lỗi kiểm tra lượt thích sản phẩm:', error);
        next(error);
    }
};

module.exports.likeProduct = async (req, res, next) => {
    try {
        const { productID, userID } = req.body;
        await addLikeProduct(productID, userID);
        res.status(200).json({ message: 'Sản phẩm đã được thích' });
    } catch (error) {
        console.error('Lỗi thích sản phẩm:', error);
        next(error);
    }
};

module.exports.unlikeProduct = async (req, res, next) => {
    try {
        const { productID, userID } = req.body;
        await removeLikeProduct(productID, userID);
        res.status(200).json({ message: 'Sản phẩm đã được bỏ thích' });
    } catch (error) {
        console.error('Lỗi bỏ thích sản phẩm:', error);
        next(error);
    }
};

module.exports.getReviews = async (req, res, next) => {
    try {
        const { productID, limit, page, typeSort } = req.query;
        let reviews;
        switch (typeSort) {
            case 'all':
                reviews = await getAllProductReviews(productID, limit, page);
                break;
            case '5':
            case '4':
            case '3':
            case '2':
            case '1':
                reviews = await getReviewsByRating(productID, limit, page, parseInt(typeSort));
                break;
            case 'image_video':
                reviews = await getReviewsWithMedia(productID, limit, page);
                break;
            default:
                reviews = await getAllProductReviews(productID, limit, page);
                break;
        }
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Lỗi lấy đánh giá sản phẩm:', error);
        next(error);
    }
};

module.exports.getEachNumofTypeRating = async (req, res, next) => {
    try {
        const { productID } = req.query;
        const ratings = await getEachNumofTypeRating(productID);
        res.status(200).json(ratings);
    } catch (error) {
        console.error('Lỗi lấy số lượng đánh giá theo loại:', error);
        next(error);
    }
};
