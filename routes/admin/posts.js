const express = require('express');
const router = express.Router();
const Post = require('../../models/post');
const Category = require('../../models/category');
const fs = require('fs');
const {isEmpty, uploadDir} = require('../../helpers/upload-helper');
const {userAuthenticated} = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req,res,next)=>{
    req.app.locals.layout='admin';
    next();
});



router.get('/',(req,res)=>{

    Post.find({}).populate('category').then(posts=>{
        res.render('admin/posts',{posts:posts});
    }).catch(err=>{
        console.log('does not work '+err);
    });
});


router.get('/my-posts',(req,res)=>{

    Post.find({user:req.user.id}).populate('category').then(posts=>{
        res.render('admin/posts/my-posts',{posts:posts});
    }).catch(err=>{
        console.log('does not work '+err);
    });
});

router.get('/create',(req,res)=>{

    Category.find({}).then(categories=>{

        res.render('admin/posts/create',{categories:categories});
    });
});




router.post('/create',(req,res)=>{

    let errors = [];

    if(!req.body.title){
        errors.push({message: 'please add a title'});
    }

    if(!req.body.body){
        errors.push({message: 'please add a description'});
    }

    if(errors.length>0){
        res.render('admin/posts/create',{
            errors: errors
        });
    }
    
    else{

        let filename = 'codeforvision.jpg';
        if(!isEmpty(req.files)){
    
            let file = req.files.file;
            filename = Date.now() + '-' + file.name;
            let dirUploads = './public/uploads/';
        
            file.mv(dirUploads + filename,(err)=>{
                if(err) throw err;
            });
        
        }
    
        
        let allowComments = true;
    
        if(req.body.allowComments){
            allowComments=true;
        }else{
            allowComments=false;
        }
    
        const newPost = Post({
            user:req.user.id,
            title:req.body.title,
            status:req.body.status,
            allowComments:allowComments,
            body:req.body.body,
            category:req.body.category,
            file:filename
        });
    
        newPost.save().then(savedPost=>{
            req.flash('success_message',`Post ${savedPost.title} was created successfully`);
            res.redirect('/admin/posts/my-posts');
        }).catch(err=>{
            console.log('could not save post'+err);
        });

    }

});




router.get('/edit/:id',(req,res)=>{
    Post.findOne({_id:req.params.id}).then(post=>{
        Category.find({}).then(categories=>{

            res.render('admin/posts/edit',{post:post, categories:categories});
        });
    });
});




router.put('/edit/:id',(req,res)=>{
    
    Post.findOne({_id:req.params.id}).then(post=>{

        if(req.body.allowComments){
            allowComments=true;
        }else{
            allowComments=false;
        }
    
        post.user = req.user.id;
        post.title = req.body.title;
        post.slug = req.body.title;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.body = req.body.body;
        post.category = req.body.category;

        if(!isEmpty(req.files)){
    
            let file = req.files.file;
            filename = Date.now() + '-' + file.name;
            post.file = filename;
            let dirUploads = './public/uploads/';
        
            file.mv(dirUploads + filename,(err)=>{
                if(err) throw err;
            });
        
        }

    
        post.save().then(UpdatedPost=>{
            req.flash('success_message',`Post was updated successfully`);
            res.redirect('/admin/posts/my-posts');
        }).catch(err=>{
            console.log('could not update post');
        });

    });
});

router.delete('/:id',(req,res)=>{
    Post.findOne({_id:req.params.id}).populate('comments').then(post=>{
        fs.unlink(uploadDir + post.file, (err)=>{

            if(!post.comments.length < 1){
                post.comments.forEach(comment=>{
                    comment.remove();
                });
            }

            post.remove().then(postRemoved=>{
                req.flash('success_message',`Post was deleted successfully`);
                res.redirect('/admin/posts/my-posts');
            });
            
        })
    });
});


module.exports = router;