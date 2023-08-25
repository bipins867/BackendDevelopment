const express=require('express')
const passwordCont=require('../Controller/password')
const emailAuthentication=require('../Middleware/email')

const router=express.Router();


router.post('/forgetPassword',emailAuthentication.authenticate,passwordCont.forgetPassword)


module.exports=router