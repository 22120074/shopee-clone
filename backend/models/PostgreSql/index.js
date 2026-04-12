require("dotenv").config();
const { Sequelize } = require("sequelize");

const isProduction = process.env.POSTGRES_URL_DELOY;

const sequelize = new Sequelize(
  process.env.POSTGRES_URL_DELOY ||
    "postgres://postgres:123456789@localhost:5432/Shoppe_DB",
  {
    logging: false,
    dialect: "postgres",
    dialectOptions: isProduction
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {},
  },
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Product = require("./Product/product.model")(sequelize);
db.Attribute = require("./Product/attribute.model")(sequelize);
db.Rating = require("./Rating/rating.model")(sequelize);
db.Stock = require("./Product/stock.model")(sequelize);
db.Sold = require("./Product/sold.model")(sequelize);
db.Follow = require("./User/follower.model")(sequelize);

// Import liên quan đến Rating
db.Image_Rating = require("./Rating/image.model")(sequelize);
db.Video_Rating = require("./Rating/video.model")(sequelize);

// Import liên quan đến Product
db.ImageProduct = require("./Product/image_product.model")(sequelize);
db.Detail = require("./Product/detail.model")(sequelize);
db.Like = require("./Product/like.model")(sequelize);
db.Order = require("./Order/order.model")(sequelize);
db.OrderItem = require("./Order/order_item.model")(sequelize);

// Import liên quan đến Notification
db.Notification = require("./Notification/notification.model")(sequelize);

// =================================================================================

// Associations giữa các bảng chính
db.Product.hasMany(db.Attribute, { foreignKey: "productId" });
db.Attribute.belongsTo(db.Product, { foreignKey: "productId" });

db.Product.hasMany(db.Rating, { foreignKey: "productId" });
db.Rating.belongsTo(db.Product, { foreignKey: "productId" });

db.Product.hasMany(db.Stock, { foreignKey: "productId" });
db.Stock.belongsTo(db.Product, { foreignKey: "productId" });

db.Attribute.hasMany(db.Stock, { foreignKey: "attributeID" });
db.Stock.belongsTo(db.Attribute, { foreignKey: "attributeID" });

db.Rating.belongsTo(db.Attribute, { foreignKey: "attributeId" });
db.Attribute.hasMany(db.Rating, { foreignKey: "attributeId" });

db.Product.hasMany(db.Sold, { foreignKey: "productId" });
db.Sold.belongsTo(db.Product, { foreignKey: "productId" });

// Associations liên quan đến Product
db.Product.hasMany(db.ImageProduct, { foreignKey: "productId" });
db.ImageProduct.belongsTo(db.Product, { foreignKey: "productId" });

db.Product.hasOne(db.Detail, { foreignKey: "productId" });
db.Detail.belongsTo(db.Product, { foreignKey: "productId" });

db.Product.hasMany(db.Like, { foreignKey: "productId" });
db.Like.belongsTo(db.Product, { foreignKey: "productId" });

// Associations liên quan đến Rating
db.Rating.hasMany(db.Image_Rating, { foreignKey: "ratingId" });
db.Image_Rating.belongsTo(db.Rating, { foreignKey: "ratingId" });

db.Rating.hasMany(db.Video_Rating, { foreignKey: "ratingId" });
db.Video_Rating.belongsTo(db.Rating, { foreignKey: "ratingId" });

// Associations liên quan đến Order
db.Order.hasMany(db.OrderItem, { foreignKey: "orderId" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });

db.Attribute.hasMany(db.OrderItem, { foreignKey: "attributeId" });
db.OrderItem.belongsTo(db.Attribute, { foreignKey: "attributeId" });

module.exports = db;
