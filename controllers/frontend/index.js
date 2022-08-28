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
        const posts = foundPosts.map(modelIns=>modelIns.toJSON())
        // console.log(posts)
        const hbsData = posts.map( (post) => {
            if(!req.session.user){
                post.ownerLoggedIn = false
                return post
            } else if (post.UserId !== req.session.user.id){
                post.ownerLoggedIn = false
                return post
            } else {
                post.ownerLoggedIn = true
                return post
            }
        })
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.user=req.session.user
        // console.log(req.session)
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
                order:[
                ['createdAt', 'DESC']
                ],
                include:[User, 
                    {model:Comment,
                    include:User}],
            }]
    }).then( async (foundUser) =>{
        const User = foundUser.toJSON()
        const Posts = await User.Posts.map( (post) => {
            if (post.UserId!==req.session.user.id){
                post.ownerLoggedIn = false
                return post
            } else {
                post.ownerLoggedIn = true
                return post
            }
        })
        User.Posts = Posts 
        const hbsData = User
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.user=req.session.user
        res.render("userPage",hbsData)
    })
})

//update user
router.get('/profile/:id', (req, res) => {
    User.findByPk(req.params.id,{
            include:[{
                model:Post,
                order:[
                ['createdAt', 'DESC']
                ],
                include:[User,
                    {model:Comment,
                    include:User}],
            }]
    }).then(async (foundUser) =>{
        const User = foundUser.toJSON()
        const Posts = await User.Posts.map( (post) => {
            if (post.UserId!==req.session.user.id){
                post.ownerLoggedIn = false
                return post
            } else {
                post.ownerLoggedIn = true
                return post
            }
        })
        User.Posts = Posts 
        const hbsData = User
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.user=req.session.user
        res.render("updateProfile",hbsData)
    })
})

//delete user
router.get('/account-deleted', (req, res) => {
    res.render("accountDeleted")
})

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
            include:[User],
                order:[
                    ['createdAt', 'DESC']
                  ]
            }]
    }).then(foundPost =>{
        const hbsData = foundPost.toJSON()
        hbsData.isLoggedIn=req.session.loggedIn
        hbsData.user=req.session.user
        const ownerLoggedInCheck = () => {
            if (hbsData.UserId!=req.session.user.id){
                return false
            }
            return true
        }
        hbsData.ownerLoggedIn = ownerLoggedInCheck()
        console.log(hbsData)
        res.render("postPage",hbsData)
    })
})

//udpate post

//delete post
router.get('/post-deleted', (req, res) => {
    res.render("postDeleted")
})

//new comment

//update comment

//delete comment

module.exports = router;