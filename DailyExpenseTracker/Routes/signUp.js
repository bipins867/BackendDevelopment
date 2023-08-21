const express=require('express')
const signUpCont=require('../Controller/signUp')

const router=express.Router()


router.get('/signUp',signUpCont.getSignUp)
router.post("/signUp",signUpCont.postSignUp)


module.exports=router