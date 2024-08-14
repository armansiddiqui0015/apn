
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt')
const {genrateToken} = require('../utils/genrateToken')

const registerController = async (req,res) =>{
    try {
        let { email, fullname, password } = req.body;
        let user = await userModel.findOne({email: email})

        if(user){
            return res.send('user already registrad')
        }

        bcrypt.genSalt(10,(err,salt)=>{
            if(err) return res.send(err)
                bcrypt.hash(password,salt,async(err,hash) =>{
                    if(err) return res.send(err)
                        let user = await userModel.create({ email, fullname, password:hash });
                    let token = genrateToken(user)
                    res.cookie('token', token)
                    res.redirect('/shop')
                  })
        })
      
    } catch (error) {
        console.error(error.massage);
    }
}
module.exports.registerController = registerController

module.exports.loginController = async(req,res) =>{
    try{
    let { email, password } = req.body;
    let user = await userModel.findOne({email: email})

    if(!user){
        return res.send('email or password is increct')
    }

    bcrypt.compare(password,user.password,(err, result) =>{
        if(err){
            return res.send('user side error')
        }

        if(result){
            let token = genrateToken(user)
            res.cookie('token', token)
            res.redirect('/shop')
        } else {
            res.send('email or password is increcat')
        }
    })
}
catch (error) {
    console.error(error.massage);
}

}

module.exports.logoutController = async (req,res) =>{
    res.cookie('token', '')
    res.redirect('/')
}