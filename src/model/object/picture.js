const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const Object = require('./object');

const Picture = db.define('Picture', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Picture.beforeCreate(picture => {
    const hashed_id = uuid.v4();
    picture.id = hashed_id;
});

Object.hasMany(Picture, { onDelete: 'cascade' });
Picture.belongsTo(Object);

module.exports = Picture;