const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) =>
  sequelize.define('Detail', {
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
    stock: DataTypes.INTEGER,
    material: DataTypes.STRING,
    origin: DataTypes.STRING,
    shipFrom: DataTypes.STRING,
    description: DataTypes.TEXT,
  });
