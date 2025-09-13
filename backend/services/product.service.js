const dbPostgre = require('../models/PostgreSql/index');
const { Sequelize } = require('sequelize');

const Product = dbPostgre.Product;
const Attribute = dbPostgre.Attribute;
const ImageProduct = dbPostgre.ImageProduct;
const Sold = dbPostgre.Sold;
const Like = dbPostgre.Like;
const Detail = dbPostgre.Detail;
const Rating = dbPostgre.Rating;
const Stock = dbPostgre.Stock;

const Video_Rating = dbPostgre.Video_Rating;
const Image_Rating = dbPostgre.Image_Rating;

// Service liên quan đến lấy thông tin sản phẩm
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
        attributes: ['id', 'imageUrl', 'nameEach', 'price', 'size'],
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
        attributes: ['rate'],
        raw: true
    });

    const stockCounts = await Stock.findAll({
        attributes: [
            'productId',
            'attributeID',
            [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
        ],
        where: {
            productId: product.id
        },
        group: ['productId', 'attributeID'],
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
        stockCounts
    };
}

// Service liên quan đến thích sản phẩm
const isLikedByUser = async (productID, userID) => {
    const like = await Like.findOne({
        where: { productId: productID, userId: userID },
        raw: true
    });
    return !!like;
}

const addLikeProduct = async (productID, userID) => {
    await Like.create({ productId: productID, userId: userID });
}

const removeLikeProduct = async (productID, userID) => {
    await Like.destroy({
        where: { productId: productID, userId: userID }
    });
}

// Service liên quan đến đánh giá sản phẩm
const getProductReviews = async (productID, limit = 6, page = 1) => {
    const offset = (page - 1) * limit;

    const reviews = await Rating.findAndCountAll({
        where: { productId: productID },
        attributes: ['id', 'rate', 'comment', 'createdAt'],
        limit,
        offset,
        include: [
            {
                model: Image_Rating,
                attributes: ['imageUrl']
            },
            {
                model: Video_Rating,
                attributes: ['videoUrl', 'thumbnailUrl']
            },
            {
                model: Attribute,
                attributes: ['nameEach', 'size']
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    return reviews;
};

module.exports = { getAllProduct, getOneProduct, addLikeProduct, isLikedByUser, removeLikeProduct, getProductReviews };