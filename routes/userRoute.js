const express = require('express')
const router = express.Router()
const {registerController,loginController,logoutController} = require('../controllers/authController')
const isLogedIn = require('../middlewares/isLogedIn')

router.get('/',(req,res)=>{
    res.send('hey, its working')
})

router.post('/register', registerController);

router.post('/login', loginController)

router.get('/logout',isLogedIn, logoutController)




module.exports = router