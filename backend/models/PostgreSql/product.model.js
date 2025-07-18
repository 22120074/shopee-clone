const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) =>
  sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    favorite: DataTypes.BOOLEAN,
    discount: DataTypes.FLOAT,
    attributeName: DataTypes.STRING,
    fromStore: DataTypes.STRING,
    category: DataTypes.STRING,
  });
