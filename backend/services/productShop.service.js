const dbPostgre = require("../models/PostgreSql/index");
const { Sequelize } = require("sequelize");
const cloudinary = require("../config/cloudinaryConfig");
const { InternalServer, BadRequest } = require("../utils/appErrors");
const notificationService = require("./notification.service");
const Shop = require("../models/Mongoose/Shop");
const mongoose = require("mongoose");

const Product = dbPostgre.Product;
const Attribute = dbPostgre.Attribute;
const ImageProduct = dbPostgre.ImageProduct;
const Sold = dbPostgre.Sold;
const Like = dbPostgre.Like;
const Detail = dbPostgre.Detail;
const Rating = dbPostgre.Rating;
const Stock = dbPostgre.Stock;
const Follow = dbPostgre.Follow;

const getAllProductShop = async (userId) => {
  const products = await Product.findAll({
    where: { fromStore: userId },
    order: [["createdAt", "DESC"]],
    raw: true,
  });

  const productWithExtra = await Promise.all(
    products.map(async (product) => {
      const attributes = await Attribute.findAll({
        where: { productId: product.id },
        attributes: ["id", "price", "nameEach", "size"],
        raw: true,
      });

      const image = await ImageProduct.findOne({
        where: { productId: product.id },
        attributes: ["id", "imageUrl"],
        raw: true,
      });

      const soldCount = await Sold.count({
        where: { productId: product.id },
        raw: true,
      });

      const stockCount = await Stock.count({
        where: { productId: product.id },
        raw: true,
      });

      return {
        ...product,
        attributes,
        image,
        soldCount,
        stockCount,
      };
    }),
  );

  return productWithExtra;
};

const createProductInfo = async (product, transaction) => {
  const newProduct = await Product.create(product, { transaction });
  if (!newProduct) throw InternalServer("Không thể tạo thông tin sản phẩm");
  return newProduct;
};

const createProductImage = async (imagesData, productId, transaction) => {
  if (!Array.isArray(imagesData) || imagesData.length === 0) {
    throw BadRequest("Sản phẩm bắt buộc phải có ít nhất một hình ảnh.");
  }
  const imageData = imagesData.map((img) => ({
    imageUrl: img.url,
    publicId: img.public_id,
    productId: productId,
  }));
  const newImages = await ImageProduct.bulkCreate(imageData, { transaction });
  if (!newImages || newImages.length === 0) {
    throw InternalServer(
      "Lỗi hệ thống: Không thể lưu danh sách hình ảnh vào cơ sở dữ liệu.",
    );
  }
  return newImages;
};

const createProductDetail = async (detail, productId, transaction) => {
  return await Detail.create({ ...detail, productId }, { transaction });
};

const createProductAttribute = async (attrData, productId, transaction) => {
  const newAttribute = await Attribute.create(
    { ...attrData, productId },
    { transaction },
  );
  if (!newAttribute) throw InternalServer("Không thể tạo thuộc tính sản phẩm");
  return newAttribute;
};

const createProductStock = async (
  stockQuantity,
  productId,
  attributeID = null,
  transaction = null,
) => {
  const quantity = parseInt(stockQuantity, 10);

  if (isNaN(quantity) || quantity < 0) {
    throw BadRequest("Số lượng kho hàng không hợp lệ");
  }

  const [stock, created] = await Stock.findOrCreate({
    where: {
      productId: productId,
      attributeID: attributeID,
    },
    defaults: { quantity: quantity },
    transaction,
  });

  if (!created) {
    await stock.increment("quantity", { by: quantity, transaction });
  }
  return stock;
};

const addProduct = async (product, detail, attributes, imagesData) => {
  try {
    return await dbPostgre.sequelize.transaction(async (t) => {
      const newProduct = await createProductInfo(product, t);
      await createProductImage(imagesData, newProduct.id, t);
      await createProductDetail(detail, newProduct.id, t);
      if (!Array.isArray(attributes) || attributes.length === 0) {
        throw BadRequest("Sản phẩm phải có ít nhất một phân loại (Attribute)");
      }
      for (const attrItem of attributes) {
        const { stock, ...attrData } = attrItem;
        const newAttr = await createProductAttribute(
          attrData,
          newProduct.id,
          t,
        );
        await createProductStock(stock, newProduct.id, newAttr.id, t);
      }
      return newProduct;
    });
  } catch (error) {
    let allPublicIds = [];
    // Lấy ID từ ảnh chính dùng public_id
    if (imagesData && imagesData.length > 0) {
      const mainIds = imagesData.map((img) => img.public_id).filter(Boolean);
      allPublicIds = [...allPublicIds, ...mainIds];
    }
    // Lấy ID từ ảnh trong attributes dùng publicId theo Model Attribute)
    if (attributes && attributes.length > 0) {
      const attrIds = attributes.map((attr) => attr.publicId).filter(Boolean);
      allPublicIds = [...allPublicIds, ...attrIds];
    }
    // Nếu có bất kỳ ID nào, ra lệnh xóa một lần duy nhất
    if (allPublicIds.length > 0) {
      cloudinary.api.delete_resources(allPublicIds).catch((err) => {
        console.error("Lỗi nghiêm trọng khi dọn dẹp Cloudinary:", err);
      });
    }
    throw error;
  }
};

const notifyFollowersNewProduct = async (newProduct) => {
  try {
    const shopId = newProduct.fromStore;

    let shopData;
    if (
      typeof shopId === "string" &&
      !mongoose.Types.ObjectId.isValid(shopId)
    ) {
      shopData = await Shop.findOne({ googleID: shopId });
    } else {
      shopData = await Shop.findOne({ userId: shopId });
    }

    const followers = await Follow.findAll({
      where: { following: shopId },
      attributes: ["follower"],
      raw: true,
    });

    if (!followers || followers.length === 0) return;

    const notificationPromises = followers.map((f) => {
      const notificationData = {
        userId: f.follower,
        senderId: shopId,
        content: JSON.stringify({
          id: newProduct.id,
          name: newProduct.name,
          shopName: shopData.nameShop,
        }),
        type: "NEW_PRODUCT",
      };

      return notificationService.createAndSendNotification(notificationData);
    });

    await Promise.all(notificationPromises);
    console.log(
      `Đã gửi thông báo sản phẩm mới đến ${followers.length} followers.`,
    );
  } catch (error) {
    console.error("Lỗi khi gửi thông báo cho follower:", error);
  }
};

module.exports = {
  getAllProductShop,
  addProduct,
  createProductInfo,
  createProductDetail,
  createProductAttribute,
  createProductImage,
  createProductStock,
  notifyFollowersNewProduct,
};
