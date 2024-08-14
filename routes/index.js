const express = require('express')
const isLogedIn = require('../middlewares/isLogedIn')
const productModel = require('../model/productModel')
const userModel = require('../model/userModel')
const router = express.Router()

router.get('/',(req,res)=>{
    let error = req.flash('error')
    res.render('index',{error, logedIn: false})
})

router.get('/shop',isLogedIn,async(req,res)=>{
    let products = await productModel.find()
    let success = req.flash('success')
    res.render('shop',{products,success})
})

router.get('/cart',isLogedIn,async(req,res)=>{
    let user = await userModel.findOne({email: req.user.email}).populate('cart')
    res.render('cart',{user})
})

router.get('/adminn',isLogedIn,async(req,res)=>{
    res.render('owner-login')
})



router.get('/addtocart/:productid',isLogedIn,async(req,res)=>{
    let user = await userModel.findOne({email:req.user.email})
    user.cart.push(req.params.productid)
    await user.save()
    req.flash('product', 'added')
    res.redirect('/shop')
})

module.exports = router