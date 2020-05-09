const express = require('express');
const router = express.Router();
const Category = require('../../models/category');
const {userAuthenticated} = require('../../helpers/authentication');


router.all('/*', userAuthenticated, (req,res,next)=>{
    req.app.locals.layout='admin';
    next();
});

router.get('/',(req,res)=>{
    Category.find({}).then(categories=>{
        res.render('admin/categories/index',{categories:categories});
    });
});

router.post('/create',(req,res)=>{

    const newCategory = Category({
        name : req.body.name,
        user : req.user.id
    });

    newCategory.save().then(savedCategory=>{
        req.flash('success_message','Category was created successfully');
        res.redirect('/admin/categories/');
    }).catch(err=>{
        console.log('there are problem',err);
    });
});

router.delete('/:id',(req,res)=>{
    Category.deleteOne({_id:req.params.id}).then(result=>{
        req.flash('success_message','Category was deleted successfully');
        res.redirect('/admin/categories');
    });
});


module.exports = router;