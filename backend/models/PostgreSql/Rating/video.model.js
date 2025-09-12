const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) =>
sequelize.define('Video_Rating', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    ratingId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    videoUrl: DataTypes.STRING,
});
