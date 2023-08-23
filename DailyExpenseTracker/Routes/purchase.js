const express=require('express')
const purchaseCont=require('../Controller/purchase')
const expenseAuthentication=require('../Middleware/expense')


const router=express.Router();


router.get('/createOrder',expenseAuthentication.authenticate,purchaseCont.getCreateOrder)
router.post('/updateTransactionStatus',expenseAuthentication.authenticate,purchaseCont.updateTransactionStatus)



module.exports=router