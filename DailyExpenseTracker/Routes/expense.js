const express=require('express')
const expenseCont=require('../Controller/expense')

const router=express.Router();


router.post('/postAddExpense',expenseCont.postAddExpense)
router.get('/getExpenses',expenseCont.getExpenses)
router.get('/getDeleteExpense/:id',expenseCont.getDeleteExpense)


module.exports=router