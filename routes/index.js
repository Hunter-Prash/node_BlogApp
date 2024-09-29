const express = require('express');
const router = express.Router();
const Post = require('../models/post');

//display all blog posts
router.get('/',async(req,res)=>{
    const posts=await Post.find().sort({createdAt:'desc'})
    res.render('index',{posts})
    
});

//show form to create post
router.get('/new',(req,res)=>{
    res.render('new-post')
});

//create new post and save to db
router.post('/posts',async(req,res)=>{
    const{title,content}=req.body;



    try{
        const post = new Post({title,content})
        await post.save()
        res.redirect('/') 
    }
    catch (e) {
        res.render('new-post', { error: 'Error creating the post!' });
    }
})

module.exports = router;
