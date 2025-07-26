const dbPostgre = require('../models/PostgreSql/index'); 

const Product = dbPostgre.Product;
const Attribute = dbPostgre.Attribute;
const ImageProduct = dbPostgre.ImageProduct;
const Sold = dbPostgre.Sold;
const Like = dbPostgre.Like;
const Detail = dbPostgre.Detail;
const Rating = dbPostgre.Rating;
const Size = dbPostgre.Size;

const getAllProduct = async ( limit ) => {
    // Bước 1: lấy danh sách sản phẩm
    const products = await Product.findAll({
        limit,
        order: [['createdAt', 'DESC']],
        raw: true
    });

    // Bước 2: xử lý từng product để truy vấn riêng
    const productWithExtra = await Promise.all(products.map(async (product) => {
        const attributes = await Attribute.findAll({
            where: { productId: product.id },
            attributes: ['id', 'price'],
            raw: true
        });

        const image = await ImageProduct.findOne({
            where: { productId: product.id },
            attributes: ['id', 'imageUrl'],
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

    return productWithExtra;
}

const getOneProduct = async (productID) => {
    const product = await Product.findOne({
        where: {
            id: productID,
        },
        raw: true
    });

    if (!product) {
        throw new Error('Product not found');
    }

    const attributes = await Attribute.findAll({
        where: { productId: product.id },
        attributes: ['imageUrl', 'nameEach', 'price'],
        raw: true
    });

    const image = await ImageProduct.findAll({
        where: { productId: product.id },
        attributes: ['imageUrl'],
        raw: true
    });

    const soldCount = await Sold.count({
        where: { productId: product.id },
        raw: true
    });

    const detailedProduct = await Detail.findOne({
        where: { productId: product.id },
        raw: true
    });

    const likes = await Like.count({
        where: { productId: product.id },
        raw: true
    });

    const ratings = await Rating.findAll({
        where: { productId: product.id },
        raw: true
    });

    const sizes = await Size.findAll({
        where: { productId: product.id },
        attributes: ['size'],
        raw: true
    });

    return {
        ...product,
        attributes,
        image,
        soldCount,
        detailedProduct,
        likes, 
        ratings,
        sizes
    };
}

module.exports = { getAllProduct, getOneProduct };