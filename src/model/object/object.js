const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const User = require('../user');
const Category = require('../category');

const Object = db.define('Object', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    createBy: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },

    category: {
        type: DataTypes.STRING,
        references: {
            model: Category,
            key: 'id'
        }
    }

});

Object.beforeCreate(object => {
    const hashed_id = uuid.v4();
    object.id = hashed_id;
});

// Relacionamentos

User.hasMany(Object, {
    foreignKey: 'createBy',
    onDelete: 'SET NULL'
});

Object.belongsTo(User, {foreignKey: 'createBy'});

Category.hasMany(Object, {
    foreignKey: 'category',
    onDelete: 'SET NULL'
});

Object.belongsTo(Category, {foreignKey: 'category'});

module.exports = Object;