const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid"); // Not used in this model, can be removed

module.exports = (sequelize) =>
  sequelize.define("ImageProduct", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Automatically generate UUID
      allowNull: false,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    imageUrl: DataTypes.STRING,
  });
