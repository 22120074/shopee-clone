const { User, DataUser } = require('../models/User');
const dbPostgre = require('../models/PostgreSql/index'); 

const Product = dbPostgre.Product;
const Attribute = dbPostgre.Attribute;
const ImageProduct = dbPostgre.ImageProduct;
const Sold = dbPostgre.Sold;

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
        const { productID, productShop } = req.query;
        const product = await Product.find({
            _id: productID,
            fromStore: productShop
        });
        res.status(200).json(product);
    } catch (error) {
        console.error('Lỗi lấy sản phẩm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.getAllProduct = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 48;

        // Bước 1: lấy danh sách sản phẩm
        const products = await Product.findAll({
            limit,
            order: [['createdAt', 'DESC']],
            raw: true // lấy plain object thay vì Sequelize instance
        });

        // Bước 2: xử lý từng product để truy vấn riêng
        const productWithExtra = await Promise.all(products.map(async (product) => {
            const attributes = await Attribute.findAll({
                where: { productId: product.id },
                raw: true
            });

            const image = await ImageProduct.findOne({
                where: { productId: product.id },
                raw: true
            });

            const soldCount = await Sold.count({
                where: { productId: product.id },
                raw: true
            });

            return {
                ...product,
                attributes,
                image,
                soldCount
            };
        }));

        res.status(200).json(productWithExtra);
    } catch (error) {
        console.error('Lỗi lấy tất cả sản phẩm:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
