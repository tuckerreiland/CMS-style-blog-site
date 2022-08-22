const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Post,Comment} = require('../../models');

//find all posts
router.get("/",(req,res)=>{
    Post.findAll({
        include:[User, Comment]
    }).then(data=>{
        res.json(data)
        console.log(req.session)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

//find all posts
router.get("/:id",(req,res)=>{
    Post.findOne({
        where:{
            id:req.params.id
        },
        include:[User, Comment]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

//create a new post
router.post("/",(req,res)=>{
    console.log(req.session)
    Post.create({
        title:req.body.title,
        post_body:req.body.post_body,
        userId:req.session.user.id
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"ERROR",err})
    })
})

//update a post
router.put("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({msg:"Login first to update your posts!"})
    }
    Post.findByPk(req.params.id).then(foundPost=>{
        if(!foundPost){
            return res.status(404).json({msg:"no such Post"})
        }
        if(foundPost.UserId!==req.session.user.id){
            return res.status(403).json({msg:"This account belongs to another Post."})
        }
        Post.update({ 
            where:{
                id:req.params.id
            },
            title:req.body.title,
            post_body:req.body.post_body,
            userId:req.session.user.id
        }).then(data=>{
            res.json(data)
        }).catch(err=>{
            res.status(500).json({msg:"ERROR",err})
        })
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})


//delete Post
router.delete("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({msg:"login first to delete this Post account."})
    }
    Post.findOne({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        console.log(data)
        console.log(req.session)
        if(req.session.user.id === data.userId){
            Post.destroy({
                where:{
                    id:req.params.id
                }
            })
        }
    }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"ERROR",err})
    })
})

module.exports = router;