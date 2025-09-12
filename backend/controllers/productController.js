const { getAllProduct, getOneProduct, isLikedByUser, addLikeProduct, removeLikeProduct, getProductReviews } = require('../services/product.service');

// module.exports.getAllProduct = async (req, res) => {
//     try {
//         const limit = parseInt(req.query.limit) || 48;
//         const products = await Product.find({}).sort({ createdAt: -1 }).limit(limit);    
//         res.status(200).json(products);
//     } catch (error) {
//         console.error('Lỗi lấy tất cả sản phẩm:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// }

module.exports.getProduct = async (req, res) => {
    try {
        const { productID } = req.query;
        // console.log('Product ID:', productID);
        const product = await getOneProduct(productID);
        res.status(200).json(product);
    } catch (error) {
        console.error('Lỗi lấy sản phẩm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAllProduct = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 48;
        const products = await getAllProduct(limit);
        res.status(200).json(products);
    } catch (error) {
        console.error('Lỗi lấy tất cả sản phẩm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.isLikedProduct = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productID } = req.query;
        const liked = await isLikedByUser(productID, userId);
        res.status(200).json({ liked });
    } catch (error) {
        console.error('Lỗi kiểm tra lượt thích sản phẩm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.likeProduct = async (req, res) => {
    try {
        const { productID, userID } = req.body;
        await addLikeProduct(productID, userID);
        res.status(200).json({ message: 'Sản phẩm đã được thích' });

    } catch (error) {
        console.error('Lỗi thích sản phẩm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.unlikeProduct = async (req, res) => {
    try {
        const { productID, userID } = req.body;
        await removeLikeProduct(productID, userID);
        res.status(200).json({ message: 'Sản phẩm đã được bỏ thích' });
    } catch (error) {
        console.error('Lỗi bỏ thích sản phẩm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.getReviews = async (req, res) => {
    try {
        const { productID, limit, page } = req.query;
        const reviews = await getProductReviews(productID, limit, page);
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Lỗi lấy đánh giá sản phẩm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};