const express=require('express')
const userCont=require('../Controller/user')
const useAuth=require('../Middleware/expense')
const router=express.Router()
const expenseCont=require('../Controller/expense')



router.post("/signUp",userCont.postSignUp)
router.post('/login',userCont.postLogin)
router.get('/download',useAuth.authenticate,expenseCont.getDownloadExpense)
module.exports=router