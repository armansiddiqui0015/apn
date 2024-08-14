const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

module.exports = async(req,res,next) =>{
    if(!req.cookies.token) {
        req.flash('error ','you need to login first');
        return res.redirect('/')
    }

    try {
        let decode = jwt.verify(req.cookies.token,process.env.JWT_KEY)
        let user = await userModel.findOne({email: decode.email}).select('-password')
        req.user = user
        next()
    } catch (error) {
        req.flash('error ','somthing want wrong');
        res.redirect('/')
    }
}