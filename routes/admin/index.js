const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/post');
const Comment = require('../../models/comment');
const Category = require('../../models/category');
const {userAuthenticated} = require('../../helpers/authentication');


router.all('/*', userAuthenticated,  (req,res,next)=>{
    req.app.locals.layout='admin';
    next();
});

router.get('/',(req,res)=>{

    const promises = [
        Post.countDocuments({user:req.user.id}).exec(),
        Category.countDocuments({user:req.user.id}).exec(),
        Comment.countDocuments({user:req.user.id}).exec()
    ];

    Promise.all(promises).then(([postCount, categoryCount, commentCount])=>{
        res.render('admin/index', {postCount:postCount, commentCount:commentCount, categoryCount:categoryCount});

    });

    // Post.countDocuments({user:req.user.id}).then(postCount=>{
    //     Comment.countDocuments({user:req.user.id}).then(commentCount=>{
    //         Category.countDocuments({user:req.user.id}).then(categoryCount=>{
                
    //             res.render('admin/index', {postCount:postCount, commentCount:commentCount, categoryCount:categoryCount});
                
    //         }); 
    //     }); 
    // });
});

router.post('/generate-fake-posts',(req,res)=>{
    for(let i=0; i<req.body.amount; i++){
        let post = new Post();

        post.title = faker.name.title();
        post.slug = faker.name.title();
        post.user = req.user.id;
        post.status = 'public';
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentence();

        post.save((err)=>{
            if(err) return err;
        });
    }

    res.redirect('/admin/posts');
});

module.exports = router;