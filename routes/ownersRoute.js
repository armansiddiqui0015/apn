const express = require('express')
const router = express.Router()
const ownerModel = require('../model/ownerModel')
const bcrypt = require('bcrypt') 

if(process.env.NODE_ENV === "devlopment"){
    router.post('/create', async(req,res) =>{
        let owners = await ownerModel.find();
        if(owners.length > 0){
            return res
            .send('one owner can be access');
        }
        let {fullname,email,password} = req.body
        let owner = await ownerModel.create({
             fullname,email,password
        })
        res.send(owner) 
    })
}

router.get('/admin',(req,res)=>{
    let success = req.flash('success')
    res.render('createproducts',{success})
})



module.exports = router 