const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123456789@localhost:5432/Shoppe_Database');

const dbPostgre = {};
dbPostgre.Sequelize = Sequelize;
dbPostgre.sequelize = sequelize;

dbPostgre.Product = require('./product.model')(sequelize);
dbPostgre.Attribute = require('./attribute.model')(sequelize);
dbPostgre.Detail = require('./detail.model')(sequelize);
dbPostgre.Rating = require('./rating.model')(sequelize);
dbPostgre.Size = require('./size.model')(sequelize);
dbPostgre.ImageProduct = require('./image_product.model')(sequelize);
dbPostgre.Sold = require('./sold.model')(sequelize);
dbPostgre.Like = require('./like.model')(sequelize);

// Quan hệ
dbPostgre.Product.hasMany(dbPostgre.ImageProduct, { foreignKey: 'productId' });
dbPostgre.Product.hasMany(dbPostgre.Size, { foreignKey: 'productId' });
dbPostgre.Product.hasMany(dbPostgre.Rating, { foreignKey: 'productId' });
dbPostgre.Product.hasOne(dbPostgre.Detail, { foreignKey: 'productId' });
dbPostgre.Product.hasMany(dbPostgre.Attribute, { foreignKey: 'productId' });
dbPostgre.Product.hasMany(dbPostgre.Sold, { foreignKey: 'productId' });
dbPostgre.Product.hasMany(dbPostgre.Like, { foreignKey: 'productId' });

module.exports = dbPostgre;
