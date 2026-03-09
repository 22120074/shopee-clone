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

const getAllProductShop = async (userId) => {
    const products = await Product.findAll({
        where: { fromStore: userId },
        order: [['createdAt', 'DESC']],
        raw: true
    });

    const productWithExtra = await Promise.all(products.map(async (product) => {
        const attributes = await Attribute.findAll({
            where: { productId: product.id },
            attributes: ['id', 'price', 'nameEach', 'size'],
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

        const stockCount = await Stock.count({
            where: { productId: product.id },
            raw: true
        });

        return {
            ...product,
            attributes,
            image,
            soldCount,
            stockCount
        };
    }));

    return productWithExtra;
};

const createProductInfo = async (product) => {
    const newProduct = await Product.create(product);
    if (!newProduct) throw new Error('Failed to create product');
    return newProduct;
};

const createProductDetail = async (detail, productId) => {
    const newDetail = await Detail.create({ ...detail, productId });
    if (!newDetail) throw new Error('Failed to create detail');
    return newDetail;
};

const createProductAttribute = async (attribute, productId) => {
    const newAttribute = await Attribute.create({ ...attribute, productId });
    if (!newAttribute) throw new Error('Failed to create attribute');
    return newAttribute;
};

const createProductImage = async (imageProduct, productId) => {
    const newImageProduct = await ImageProduct.create({ ...imageProduct, productId });
    if (!newImageProduct) throw new Error('Failed to create image product');
    return newImageProduct;
};

const createProductStock = async (stockQuantity, productId, attributeID = null) => {
    const quantity = parseInt(stockQuantity, 10);

    if (isNaN(quantity) || quantity <= 0) return null;

    const [stock, created] = await Stock.findOrCreate({
        where: { 
            productId: productId,
            attributeID: attributeID 
        },
        defaults: { quantity: quantity }
    });

    if (!created) {
        await stock.increment('quantity', { by: quantity });
        await stock.reload();
    }
    return stock;
};

const addProduct = async (product, detail, attribute, imageProduct, stock) => {
    const newProduct = await createProductInfo(product);
    await createProductDetail(detail, newProduct.id);
    const newAttribute = await createProductAttribute(attribute, newProduct.id);
    await createProductImage(imageProduct, newProduct.id);
    await createProductStock(stock, newProduct.id, newAttribute.id);
    return newProduct;
};

module.exports = {
    getAllProductShop,
    addProduct,
    createProductInfo,
    createProductDetail,
    createProductAttribute,
    createProductImage,
    createProductStock
};