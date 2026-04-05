const { DataTypes } = require("sequelize");

module.exports = (sequelize) =>
  sequelize.define("Follow", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    follower: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    following: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
