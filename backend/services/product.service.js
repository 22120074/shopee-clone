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
const getAllProductReviews = async (productID, limit = 6, page = 1) => {
    const offset = (page - 1) * limit;

    const reviews = await Rating.findAndCountAll({
        where: { productId: productID },
        attributes: ['id', 'dataUserId', 'rate', 'comment', 'createdAt'],
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

    return {
        reviews,
        totalPages: Math.ceil(reviews.count / limit),
        currentPage: page
    };
};

const getReviewsByRating = async (productID, limit = 6, page = 1, rating) => {
    const reviews = await Rating.findAndCountAll({
        where: { productId: productID, rate: rating },
        attributes: ['id', 'dataUserId', 'rate', 'comment', 'createdAt'],
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

    // Phân trang thủ công
    const total = reviews.count;
    const totalPages = Math.ceil(total / limit);
    const safePage = Math.min(Math.max(parseInt(page), 1), totalPages || 1);
    const safeOffset = (safePage - 1) * limit;
    const pagedReviews = reviews.rows.slice(safeOffset, safeOffset + limit);

    return {
        rows: pagedReviews,
        totalPages: totalPages,
        currentPage: safePage
    };
};

const getReviewsWithMedia = async (productID, limit = 6, page = 1) => {
    const reviews = await Rating.findAll({
        where: { productId: productID },
        attributes: ['id', 'dataUserId', 'rate', 'comment', 'createdAt'],
        include: [
            { model: Image_Rating, attributes: ['imageUrl'], required: false },
            { model: Video_Rating, attributes: ['videoUrl', 'thumbnailUrl'], required: false },
            { model: Attribute, attributes: ['nameEach', 'size'], required: false }
        ],
    });

    // Lọc review có ít nhất 1 media
    const filteredReviews = reviews.filter(
        r => (r.Image_Ratings && r.Image_Ratings.length > 0) || (r.Video_Ratings && r.Video_Ratings.length > 0)
    );

    // Sắp xếp theo ngày tạo mới nhất
    filteredReviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Phân trang thủ công
    const total = filteredReviews.length;
    const totalPages = Math.ceil(total / limit);
    const safePage = Math.min(Math.max(parseInt(page), 1), totalPages || 1);
    const safeOffset = (safePage - 1) * limit;
    const pagedReviews = filteredReviews.slice(safeOffset, safeOffset + limit);

    return {
        rows: pagedReviews,
        totalPages: totalPages,
        currentPage: safePage
    };
};

const getEachNumofTypeRating = async (productID) => {
    const allCounts = await Rating.findAndCountAll({
        where: { productId: productID },
    });

    const ratingEachCounts = await Rating.findAll({
        where: { productId: productID },
        attributes: [
            'rate',
            [Sequelize.fn('COUNT', Sequelize.col('rate')), 'count']
        ],
        group: ['rate'],
        raw: true
    });

    const mediaCounts = await Rating.findAll({
        where: { productId: productID },
        attributes: ['id', 'dataUserId', 'rate', 'comment', 'createdAt'],
        include: [
            { model: Image_Rating, attributes: ['imageUrl'], required: false },
            { model: Video_Rating, attributes: ['videoUrl', 'thumbnailUrl'], required: false },
            { model: Attribute, attributes: ['nameEach', 'size'], required: false }
        ],
    });

    // Lọc review có ít nhất 1 media
    const filteredReviews = mediaCounts.filter(
        r => (r.Image_Ratings && r.Image_Ratings.length > 0) || (r.Video_Ratings && r.Video_Ratings.length > 0)
    );

    const result = {
        all: allCounts,
        withMedia: filteredReviews.length,
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    };

    ratingEachCounts.forEach(r => {
        result[r.rate] = parseInt(r.count);
    });

    return result;
};

module.exports = { getAllProduct, getOneProduct, addLikeProduct, isLikedByUser, removeLikeProduct,
    getAllProductReviews, getReviewsByRating, getReviewsWithMedia, getEachNumofTypeRating };