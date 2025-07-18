const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) =>
  sequelize.define('Attribute', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    nameEach: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    price: DataTypes.FLOAT,
  });
