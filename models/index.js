const User = require("./User");
const Post = require("./Post")
const Comment = require("./Comment")

User.hasMany(Post, {
    foreignKey:{
        allowNull:false
    }
})
Post.belongsTo(User)

User.hasMany(Comment, {
    foreignKey:{
        allowNull:false
    }
})
Comment.belongsTo(User)

Post.hasMany(Comment, {
    foreignKey:{
        allowNull:false
    }
})
Comment.belongsTo(Post)

module.exports={
    User,
    Post,
    Comment
}