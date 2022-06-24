const { sequelize, Sequelize } = require('../config/databases')
const { DataTypes } = Sequelize
const {Post} = require('./postSchema')

const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token:{
        type:DataTypes.STRING,
        allowNull:true
    }
},{
    timestamps:false
})

User.hasMany(Post,{
    foreignKey:"userid",
    sourcekey:"id"
})
Post.belongsTo(User)

module.exports = { User }