const { getAllProduct, getOneProduct } = require('../services/product.service');

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
