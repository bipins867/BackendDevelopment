const express=require('express')
const expenseCont=require('../Controller/expense')
const expenseAuthentication=require('../Middleware/expense')


const router=express.Router();


router.post('/postAddExpense',expenseAuthentication.authenticate,expenseCont.postAddExpense)
router.get('/getExpenses',expenseAuthentication.authenticate,expenseCont.getExpenses)
router.get('/getDeleteExpense/:id',expenseAuthentication.authenticate,expenseCont.getDeleteExpense)
router.get('/getExpenseByPage/:page',expenseAuthentication.authenticate,expenseCont.getExpenseByPage)

module.exports=router