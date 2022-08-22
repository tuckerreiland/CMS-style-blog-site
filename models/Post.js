const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    // add properites here, ex:
    title: {
        type: DataTypes.STRING,
        allowNull:false,
   },
    post_body: {
         type: DataTypes.STRING,
         allowNull:false,
    },
    createdAt: {
        type: DataTypes.INTEGER,
        allowNull:false,
        constraints:{
            len: [2,10],
        }
    },
},{
    sequelize
});

module.exports=Post