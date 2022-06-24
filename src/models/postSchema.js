const { sequelize, Sequelize } = require('../config/databases')
const { DataTypes } = Sequelize
const {Comment} =require('./commentSchema')

const Post = sequelize.define('post', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userid:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    image_url:{
        type:DataTypes.STRING,
    },
    show:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
    }
    
},{
    timestamps:false,
})


Post.hasMany(Comment,{
    foreignKey:"postid",
    sourcekey:"id"
})
Comment.belongsTo(Post)



module.exports = { Post }