const express = require('express')
const usercontroller=require('../Controllers/usercontroller.js')
const router=express.Router()

router.post('/user/register',usercontroller.register)
router.post('/user/login',usercontroller.login)

module.exports=router
