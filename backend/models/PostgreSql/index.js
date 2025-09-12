const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123456789@localhost:5432/Shoppe_Database', 
    {
        logging: false,
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.Product = require('./product.model')(sequelize);
db.Attribute = require('./attribute.model')(sequelize);
db.ImageProduct = require('./image_product.model')(sequelize);
db.Like = require('./like.model')(sequelize);
db.Rating = require('./rating.model')(sequelize);
db.Detail = require('./detail.model')(sequelize);
db.Stock = require('./stock.model')(sequelize);
db.Sold = require('./sold.model')(sequelize);

// Import liên quan đến Rating
db.Image_Rating = require('./Rating/image.model')(sequelize);
db.Video_Rating = require('./Rating/video.model')(sequelize);

// Associations giữa các bảng chính
db.Product.hasMany(db.Attribute, { foreignKey: 'productId' });
db.Attribute.belongsTo(db.Product, { foreignKey: 'productId' });

db.Product.hasMany(db.ImageProduct, { foreignKey: 'productId' });
db.ImageProduct.belongsTo(db.Product, { foreignKey: 'productId' });

db.Product.hasMany(db.Like, { foreignKey: 'productId' });
db.Like.belongsTo(db.Product, { foreignKey: 'productId' });

db.Product.hasMany(db.Rating, { foreignKey: 'productId' });
db.Rating.belongsTo(db.Product, { foreignKey: 'productId' });

db.Product.hasOne(db.Detail, { foreignKey: 'productId' });
db.Detail.belongsTo(db.Product, { foreignKey: 'productId' });

db.Product.hasMany(db.Stock, { foreignKey: 'productId' });
db.Stock.belongsTo(db.Product, { foreignKey: 'productId' });

db.Attribute.hasMany(db.Stock, { foreignKey: 'attributeID' });
db.Stock.belongsTo(db.Attribute, { foreignKey: 'attributeID' });

db.Product.hasMany(db.Sold, { foreignKey: 'productId' });
db.Sold.belongsTo(db.Product, { foreignKey: 'productId' });

// Associations liên quan đến Rating
db.Rating.hasMany(db.Image_Rating, { foreignKey: 'ratingId' });
db.Image_Rating.belongsTo(db.Rating, { foreignKey: 'ratingId' });

db.Rating.hasMany(db.Video_Rating, { foreignKey: 'ratingId' });
db.Video_Rating.belongsTo(db.Rating, { foreignKey: 'ratingId' });


module.exports = db;