const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {User,Post,Comment} = require('../../models');

//find all users
router.get("/",(req,res)=>{
    User.findAll({
        include:[Post, Comment]
    }).then(data=>{
        res.json(data)
        console.log(req.session)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

//find all users
router.get("/:id",(req,res)=>{
    User.findOne({
        where:{
            id:req.params.id
        },
        include:[Post, Comment]
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

//user sign up
router.post("/",(req,res)=>{
    User.create({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
    }).then(data=>{
        res.json(data)
        console.log(data.email)
        User.findOne({
            where:{
                email:data.email
            }
        }).then(foundUser=>{
            req.session.loggedIn=true;
            req.session.user={
                id:foundUser.id,
                username:foundUser.username,
                email:foundUser.email,
            }
            console.log(req.session)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})
})

//user login
router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"Invalid login credentials!"})
        }
        if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"Invalid login credentials!"})
        }
        req.session.loggedIn=true;
        req.session.user={
            id:foundUser.id,
            username:foundUser.username,
            email:foundUser.email,
            isLoggedIn:true
        }
        console.log(req.session)
        return res.status(200).json(foundUser)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

router.post("/logout/:id",(req,res)=>{
    User.findOne({
        where:{
            id:req.params.id
        }
    }).then(foundUser=>{
        if(!foundUser){
            return res.status(401).json({msg:"User doesn't exist!"})
        }
        req.session.destroy();
        console.log(req.session)
        return res.status(200).json(foundUser)
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

//update a user
router.put("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({msg:"Login first to update your account!"})
    }
    User.findByPk(req.params.id).then(data=>{
        const foundUser = data.toJSON()
        console.log(foundUser)
        console.log(req.session.user)
        if(!foundUser){
            return res.status(404).json({msg:"no such user"})
        }
        if(foundUser.id !== req.session.user.id){
            return res.status(403).json({msg:"This account belongs to another user."})
        }
        if(!bcrypt.compareSync(req.body.oldPassword,foundUser.password)){
            return res.status(403).json({msg:"This account belongs to another user. Password"})
        }
        if(!req.body.newPassword) {
        User.update({ 
            username:req.body.username,
            email:req.body.email,
        },{
            where:{
                id:req.params.id
            },
        }).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).json({msg:"ERROR",err})
        })
        } else {
            User.update({ 
            username:req.body.username,
            email:req.body.email,
            password: req.body.newPassword,
        },{
            where:{
                id:req.params.id
            },
        }).then(data=>{
            res.json(data)
        }).catch(err=>{
            console.log(err)
            res.status(500).json({msg:"ERROR",err})
        })
        }
    }).catch(err=>{
        res.status(500).json({msg:"ERROR",err})
    })
})

//delete User
router.delete("/:id",(req,res)=>{
    if(!req.session.user){
        return res.status(403).json({msg:"login first to delete this account."})
    }
    User.findOne({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        const foundUser = data.toJSON()
        if(req.session.user.id === foundUser.id){
            User.destroy({
                where:{
                    id:data.id
                }
            })
        }
    }).then(data =>{
        req.session.destroy();
        res.json({msg:`Account deleted!`,data})
    }).catch(err=>{
        console.log(err)
        res.status(500).json({msg:"ERROR",err})
    })
})

module.exports = router;