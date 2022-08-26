const express = require('express');
const router = express.Router();
const {User,Post,Comment} = require('../../models');

//home
router.get('/', (req, res) => {
    Post.findAll({
        include:[User, Comment],
        order: [
            ['createdAt', 'DESC']
          ],
    }).then(foundPosts =>{
        const hbsData = foundPosts.map(modelIns=>modelIns.toJSON())
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.user=req.session.user
        console.log(req.session)
        console.log(hbsData)
        res.render("home",{
            posts: hbsData,
            isLoggedIn:req.session.loggedIn,
            user: req.session.user
        })
    })
})

//post user
router.get('/sign-up', (req, res) => {
    res.render("signUp")
})

//log in
router.get('/log-in', (req, res) => {
    res.render("logIn")
})

//log out
router.get('/log-out', (req, res) => {
    res.render("logOut")
})

//get one user
router.get('/user/:id', (req, res) => {
    User.findByPk(req.params.id,{
            include:[{
                model:Post,
                include:[User],
            }]
    }).then(foundUser =>{
        const hbsData = foundUser.toJSON()
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.user=req.session.user
        console.log(hbsData)
        res.render("userPage",hbsData)
    })
})
//update user

//delete user

//new post page
router.get('/new-post', (req, res) => {
    const hbsData=req.session.user
    hbsData.isLoggedIn=req.session.loggedIn
    hbsData.UserId=req.session.user.id
    console.log(hbsData)
    res.render("newPost", hbsData)
})

//get one post
router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id,{
            include:[
                User,
                {model:Comment,
                include:[User]}]
                
    }).then(foundPost =>{
        const hbsData = foundPost.toJSON()
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.user=req.session.user
        console.log(hbsData)
        res.render("postPage",hbsData)
    })
})

//udpate post

//delete post

//new comment

//update comment

//delete comment

module.exports = router;