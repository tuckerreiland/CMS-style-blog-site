const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Comment,Post} = require('../../models');

//find all Comments
router.get("/",(req,res)=>{
    Comment.findAll({
        include:[User, Post]
    }).then(data=>{
        res.json(data)
        console.log(req.session)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

//find all Comments
router.get("/:id",(req,res)=>{
    Comment.findOne({
        where:{
            id:req.params.id
        },
        include:[User, Post]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

//create a new Comment
router.post("/:PostId",(req,res)=>{
    console.log(req.session)
    Comment.create({
        comment_body:req.body.comment_body,
        UserId:req.session.user.id,
        PostId:req.params.PostId
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"ERROR",err})
    })
})

//update a Comment
router.put("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({msg:"Login first to update your Comments!"})
    }
    Comment.findByPk(req.params.id).then(foundComment=>{
        console.log(foundComment)
        if(!foundComment){
            return res.status(404).json({msg:"no such Comment"})
        }
        if(foundComment.UserId!==req.session.user.id){
            return res.status(403).json({msg:"This account belongs to another Comment."})
        }
        Comment.update({
            comment_body:req.body.comment_body,
        },{
            where:{
                id:foundComment.id
            },
        }).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.status(500).json({msg:"ERROR",err})
        })
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})


//delete Comment
router.delete("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({msg:"login first to delete this Comment account."})
    }
    Comment.findByPk(req.params.id).then(foundComment=>{
        console.log(foundComment)
        if(req.session.user.id === foundComment.UserId){
            Comment.destroy({
                where:{
                    id:foundComment.id
                }
            })
        }
    }).then(data =>{
        res.json({msg:`Comment deleted!`,data})
    }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"ERROR",err})
    })
})

module.exports = router;