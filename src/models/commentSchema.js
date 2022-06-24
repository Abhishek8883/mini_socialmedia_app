const { sequelize, Sequelize } = require('../config/databases')
const { DataTypes } = Sequelize

const Comment = sequelize.define('comment', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postid:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    desc:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    user:{
        type:DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps:false,
})

module.exports = { Comment }