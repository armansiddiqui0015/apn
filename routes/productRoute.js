const express = require('express')
const upload = require('../config/multer-config')
const productModel = require('../model/productModel')
const router = express.Router()

router.post('/create' ,upload.single('image'), async (req,res) =>{
    try {
        let {name, price,discount,bgcolor,panelcolor,textcolor} = req.body
        let product = await productModel.create({
           image: req.file.buffer ,name,price,discount,bgcolor,panelcolor,textcolor
        })
        req.flash('product created succesfully')
        res.redirect('/shop')
    } catch (error) {
        res.send(error.massage)
    }
   
})

router.get('/',(req,res)=>{ 
    res.send('hey, its working')
})


module.exports = router